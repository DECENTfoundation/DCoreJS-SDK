import { Expose } from "class-transformer";
import { BaseRequest } from "./request/BaseRequest";

export class RequestJson {
    @Expose({ name: "id" }) public callId: number;
    @Expose({ name: "method" }) public method: string = "call";
    @Expose({ name: "params" }) public params: any[];

    constructor(request: BaseRequest<any>, callId: number, callbackId?: number) {
        this.callId = callId;
        this.params = [request.apiGroup.valueOf(), request.method, callbackId ? [callbackId].concat(request.params) : request.params];
    }
}
