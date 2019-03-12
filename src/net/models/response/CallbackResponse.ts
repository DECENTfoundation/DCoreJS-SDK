export interface CallbackResponse {
    method: string;
    params: [number, object[]]; // params: [callbackId, [result]]
}
