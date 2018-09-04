export interface WsResultNotice {
    method: string;
    params: [number, object[]]; // params: [callbackId, [result]]
}
