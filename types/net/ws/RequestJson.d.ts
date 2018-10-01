import { BaseRequest } from "../models/request/BaseRequest";
export declare class RequestJson {
    callId: number;
    method: string;
    params: any[];
    constructor(callId: number, apiId: number, request: BaseRequest<any>);
}
