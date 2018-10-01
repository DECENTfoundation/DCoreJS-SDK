import { CoreOptions } from "request";
import { Observable } from "rxjs/internal/Observable";
import { BaseRequest } from "../models/request/BaseRequest";
export declare class RpcEndpoints {
    private baseRequest;
    constructor(options: CoreOptions);
    request<T>(request: BaseRequest<T>): Observable<T>;
}
