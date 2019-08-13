import { Logger } from "pino";
import { CoreOptions } from "request";
import { DCoreClient } from "src";
import * as promise from "./api/promise/DCoreApi";
import * as rx from "./api/rx/DCoreApi";
import { WebSocketFactory } from "./net/ws/RxWebSocket";

export class DCoreSdk {
    public static createApiPromise(httpOptions: CoreOptions, webSocketFactory: WebSocketFactory, logger?: Logger): promise.DCoreApi {
        return new promise.DCoreApi(DCoreClient.create(httpOptions, webSocketFactory, logger));
    }

    public static createApiRx(httpOptions: CoreOptions, webSocketFactory: WebSocketFactory, logger?: Logger): rx.DCoreApi {
        return DCoreClient.create(httpOptions, webSocketFactory, logger);
    }
}
