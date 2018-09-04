import { Expose } from "class-transformer";
import { BaseRequest } from "../models/request/BaseRequest";

export class RequestJson {
    @Expose({ name: "id" }) public callId: number;
    @Expose({ name: "method" }) public method: string = "call";
    @Expose({ name: "params" }) public params: any[];

    constructor(callId: number, apiId: number, request: BaseRequest<any>) {
        this.callId = callId;
        this.params = [apiId, request.method, request.params];
    }
}
