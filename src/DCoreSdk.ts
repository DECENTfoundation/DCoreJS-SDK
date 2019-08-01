import Decimal from "decimal.js";
import * as _ from "lodash";
import { Duration } from "moment";
import * as P from "pino";
import { Logger } from "pino";
import { CoreOptions } from "request";
import { Observable, of, throwError, zip } from "rxjs";
import { flatMap, map, tap } from "rxjs/operators";
import { DCoreApi } from "./DCoreApi";
import { DCoreConstants } from "./DCoreConstants";
import { Asset } from "./models/Asset";
import { AssetAmount } from "./models/AssetAmount";
import { ChainObject } from "./models/ChainObject";
import { IllegalArgumentError } from "./models/error/IllegalArgumentError";
import { BaseOperation } from "./models/operation/BaseOperation";
import { Transaction } from "./models/Transaction";
import { BaseRequest } from "./net/models/request/BaseRequest";
import { GetChainId } from "./net/models/request/GetChainId";
import { GetDynamicGlobalProps } from "./net/models/request/GetDynamicGlobalProps";
import { GetRequiredFees } from "./net/models/request/GetRequiredFees";
import { WithCallback } from "./net/models/request/WithCallback";
import { RpcService } from "./net/rpc/RpcService";
import { RxWebSocket, WebSocketFactory } from "./net/ws/RxWebSocket";
import { ObjectCheckOf } from "./utils/ObjectCheckOf";
import { assertThrow, info } from "./utils/Utils";

export type NftRef = ChainObject | string;
export type AccountRef = ChainObject | string;
export type AssetRef = ChainObject | string;
export type AssetWithAmount = [Asset, AssetAmount];
export type AssetPrecision = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Fee = ChainObject | AssetAmount;
export declare type Newable<T> = new (...args: any[]) => T;

Decimal.set({
    // max amount have precision 16 (satoshi significant places) and we are doubling that for partial result from multiply/division operations
    precision: 32,
});

export class DCoreSdk {
    public static createForHttp(options: CoreOptions, logger: Logger = DCoreSdk.DEFAULT_LOGGER): DCoreApi {
        return new DCoreApi(new DCoreSdk(logger, new RpcService(options, logger)));
    }

    public static createForWebSocket(factory: WebSocketFactory, logger: Logger = DCoreSdk.DEFAULT_LOGGER): DCoreApi {
        return new DCoreApi(new DCoreSdk(logger, undefined, new RxWebSocket(factory, logger)));
    }

    public static create(options: CoreOptions, factory: WebSocketFactory, logger: Logger = DCoreSdk.DEFAULT_LOGGER): DCoreApi {
        return new DCoreApi(new DCoreSdk(logger, new RpcService(options, logger), new RxWebSocket(factory, logger)));
    }

    private static get DEFAULT_LOGGER() {
        return P({ name: "DCORE", base: undefined, enabled: false });
    }

    private chainId?: string;

    private constructor(private logger: Logger, private rpc?: RpcService, private ws?: RxWebSocket) {
        assertThrow(rpc != null || ws != null, () => "rpc or webSocket must be set");
    }

    public requestStream<T>(request: BaseRequest<T> & WithCallback): Observable<T> {
        if (this.ws) {
            return this.ws.requestStream(request).pipe(info("API_request_callback_" + request.method, this.logger));
        } else {
            return throwError(new IllegalArgumentError("callbacks not available through HTTP API"));
        }
    }

    public request<T>(request: BaseRequest<T>): Observable<T> {
        let result: Observable<T>;
        assertThrow(_.isNil(this.ws) || _.isNil(this.rpc), () => "either ws or rpc must be present");
        if (this.ws && (_.isNil(this.rpc) || this.ws.isConnected() || ObjectCheckOf<WithCallback>(request, "callbackId"))) {
            result = this.ws.request(request);
        } else {
            if (_.isNil(this.rpc)) {
                return throwError(new IllegalArgumentError("callbacks not available through HTTP API"));
            }
            result = this.rpc.request(request);
        }
        return result.pipe(info("API_request_" + request.method, this.logger));
    }

    public set timeout(millis: number) {
        if (this.ws) {
            this.ws.timeout = millis;
        }
    }

    public disconnect() {
        if (this.ws) {
            this.ws.disconnect();
        }
    }

    public prepareTransaction(operations: BaseOperation[], transactionExpiration: Duration): Observable<Transaction> {
        const [withoutFees, withFees] = operations.reduce((res: [BaseOperation[], BaseOperation[]], el) => {
            res[_.isNil(el.fee) ? 0 : 1].push(el);
            return res;
        }, [[], []]);
        let finalOps: Observable<BaseOperation[]>;
        if (withoutFees.length > 0) {
            const forId = withoutFees.reduce((res: Map<string, BaseOperation[]>, el) => {
                const feeAssetId = (el.feeAssetId ? el.feeAssetId : DCoreConstants.DCT_ASSET_ID).objectId;
                if (!res.has(feeAssetId)) {
                    res.set(feeAssetId, []);
                }
                res.get(feeAssetId)!.push(el);
                return res;
            }, new Map());
            const feeRequests = Array.from(forId.entries()).map(([feeId, ops]) =>
                this.request(new GetRequiredFees(ops, ChainObject.parse(feeId))).pipe(
                    map((fees) => ops.map((op, idx) => {
                        op.fee = fees[idx];
                        return op;
                    })),
                ));
            finalOps = zip(...feeRequests).pipe(map((ops) => _.flatten(ops).concat(withFees)));
        } else {
            finalOps = of(withFees);
        }
        let chainId: Observable<string>;
        if (_.isNil(this.chainId)) {
            chainId = this.request(new GetChainId()).pipe(tap((id) => this.chainId = id));
        } else {
            chainId = of(this.chainId);
        }
        return chainId.pipe(flatMap((id) =>
            zip(
                finalOps,
                this.request(new GetDynamicGlobalProps()),
            ).pipe(map(([ops, props]) => Transaction.create(ops, id, props, transactionExpiration)))),
        );
    }
}
