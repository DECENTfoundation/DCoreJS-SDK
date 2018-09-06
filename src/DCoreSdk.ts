import * as Long from "long";
import * as moment from "moment";
import { CoreOptions } from "request";
import { Observable, throwError } from "rxjs";
import { tag } from "rxjs-spy/operators";
import { Address } from "./crypto/Address";
import { DCoreApi } from "./DCoreApi";
import { Asset } from "./models/Asset";
import { ChainObject } from "./models/ChainObject";
import { ApiGroup } from "./net/models/ApiGroup";
import { BaseRequest } from "./net/models/request/BaseRequest";
import { RpcEndpoints } from "./net/rpc/RpcEndpoints";
import { RxWebSocket, WebSocketFactory } from "./net/ws/RxWebSocket";
import { assertThrow } from "./utils/Utils";

export type AccountRef = ChainObject | string | Address;
export type AssetWithAmount = [Asset, Long];

export class DCoreSdk {

    public static readonly DCT_CHAIN_ID = "17401602b201b3c45a3ad98afc6fb458f91f519bd30d1058adf6f2bed66376bc";
    public static readonly DCT_ASSET_ID = ChainObject.parse("1.3.0");
    public static readonly PROXY_TO_SELF_ACCOUNT_ID = ChainObject.parse("1.2.3");

    public static transactionExpiration = moment.duration(30, "seconds");

    public static createForHttp(options: CoreOptions): DCoreApi {
        return new DCoreApi(new DCoreSdk(new RpcEndpoints(options)));
    }

    public static createForWebSocket(factory: WebSocketFactory): DCoreApi {
        return new DCoreApi(new DCoreSdk(null, new RxWebSocket(factory)));
    }

    public static create(options: CoreOptions, factory: WebSocketFactory): DCoreApi {
        return new DCoreApi(new DCoreSdk(new RpcEndpoints(options), new RxWebSocket(factory)));
    }

    constructor(private rpc?: RpcEndpoints, private ws?: RxWebSocket) {
        assertThrow(rpc != null || ws != null, () => "rpc or webSocket must be set");
    }

    public request<T>(request: BaseRequest<T>): Observable<T> {
        let result: Observable<T>;
        if (this.rpc != null && (this.ws == null || this.ws.isConnected())) {
            if (request.apiGroup !== ApiGroup.Database) {
                return throwError(Error("not available through HTTP API"));
            }
            result = this.rpc.request(request);
        } else if (this.ws != null) {
            result = this.ws.request(request);
        }
        return result.pipe(tag("API_request"));
    }
}
