import * as _ from "lodash";
import * as Long from "long";
import { Duration } from "moment";
import { CoreOptions } from "request";
import { Observable, throwError, zip } from "rxjs";
import { tag } from "rxjs-spy/operators";
import { scalar } from "rxjs/internal/observable/scalar";
import { concatMap, flatMap, map, tap } from "rxjs/operators";
import { Address } from "./crypto/Address";
import { ECKeyPair } from "./crypto/ECKeyPair";
import { DCoreApi } from "./DCoreApi";
import { Asset } from "./models/Asset";
import { BlockData } from "./models/BlockData";
import { ChainObject } from "./models/ChainObject";
import { BaseOperation } from "./models/operation/BaseOperation";
import { Transaction } from "./models/Transaction";
import { TransactionConfirmation } from "./models/TransactionConfirmation";
import { ApiGroup } from "./net/models/ApiGroup";
import { BaseRequest } from "./net/models/request/BaseRequest";
import { BroadcastTransaction } from "./net/models/request/BroadcastTransaction";
import { BroadcastTransactionWithCallback } from "./net/models/request/BroadcastTransactionWithCallback";
import { GetChainId } from "./net/models/request/GetChainId";
import { GetDynamicGlobalProps } from "./net/models/request/GetDynamicGlobalProps";
import { GetRequiredFees } from "./net/models/request/GetRequiredFees";
import { RpcEnabledApis } from "./net/rpc/RpcEnabledApis";
import { RpcService } from "./net/rpc/RpcService";
import { RxWebSocket, WebSocketFactory } from "./net/ws/RxWebSocket";
import { assertThrow } from "./utils/Utils";

export type AccountRef = ChainObject | string | Address;
export type AssetWithAmount = [Asset, Long];

export class DCoreSdk {

    public static createForHttp(options: CoreOptions): DCoreApi {
        return new DCoreApi(new DCoreSdk(new RpcService(options)));
    }

    public static createForWebSocket(factory: WebSocketFactory): DCoreApi {
        return new DCoreApi(new DCoreSdk(null, new RxWebSocket(factory)));
    }

    public static create(options: CoreOptions, factory: WebSocketFactory): DCoreApi {
        return new DCoreApi(new DCoreSdk(new RpcService(options), new RxWebSocket(factory)));
    }

    private chainId?: string;

    constructor(private rpc?: RpcService, private ws?: RxWebSocket) {
        assertThrow(rpc != null || ws != null, () => "rpc or webSocket must be set");
    }

    public request<T>(request: BaseRequest<T>): Observable<T> {
        let result: Observable<T>;
        if (this.ws != null && (this.rpc == null || this.ws.isConnected() || request.apiGroup !== ApiGroup.Database)) {
            result = this.ws.request(request);
        } else {
            if (!_.includes(RpcEnabledApis, request.apiGroup)) {
                return throwError(Error("not available through HTTP API"));
            }
            result = this.rpc.request(request);
        }
        return result.pipe(tag("API_request_" + request.method));
    }

    public broadcast(privateKey: ECKeyPair, operations: BaseOperation[], transactionExpiration: Duration): Observable<void> {
        return this.prepareTransaction(operations, transactionExpiration).pipe(
            map((trx) => trx.sign(privateKey)),
            concatMap((trx) => this.request(new BroadcastTransaction(trx))),
        );
    }

    public broadcastWithCallback(privateKey: ECKeyPair, operations: BaseOperation[], transactionExpiration: Duration): Observable<TransactionConfirmation> {
        return this.prepareTransaction(operations, transactionExpiration).pipe(
            map((trx) => trx.sign(privateKey)),
            concatMap((trx) => this.request(new BroadcastTransactionWithCallback(trx, this.ws.getCallId()))),
        );
    }

    public disconnect() {
        if (this.ws != null) {
            this.ws.close();
        }
    }

    public prepareTransaction(operations: BaseOperation[], transactionExpiration: Duration): Observable<Transaction> {
        const [withoutFees, withFees] = operations.reduce((res: [BaseOperation[], BaseOperation[]], el) => {
            res[_.isNil(el.fee) ? 0 : 1].push(el);
            return res;
        }, [[], []]);
        let finalOps: Observable<BaseOperation[]>;
        if (withoutFees.length > 0) {
            finalOps = this.request(new GetRequiredFees(operations)).pipe(
                map((fees) => withoutFees.map((op, idx) => {
                    op.fee = fees[idx];
                    return op;
                })),
                map((ops) => ops.concat(withFees)),
            );
        } else {
            finalOps = scalar(withFees);
        }
        let chainId: Observable<string>;
        if (_.isNil(this.chainId)) {
            chainId = this.request(new GetChainId()).pipe(tap((id) => this.chainId = id));
        } else {
            chainId = scalar(this.chainId);
        }
        return chainId.pipe(flatMap((id) =>
            zip(
                finalOps,
                this.request(new GetDynamicGlobalProps()),
            ).pipe(map(([ops, props]) => new Transaction(new BlockData(props, transactionExpiration), ops, id)))),
        );
    }
}
