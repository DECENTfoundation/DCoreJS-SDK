import { Expose } from "class-transformer";
import { BaseRequest } from "../models/request/BaseRequest";

export class HttpJson {
    @Expose({ name: "id" }) public id: number = 1;
    @Expose({ name: "method" }) public method: string = "call";
    @Expose({ name: "params" }) public params: any[];

    constructor(request: BaseRequest<any>, apiId: number) {
        this.params = [apiId, request.method, request.params];
    }
}
