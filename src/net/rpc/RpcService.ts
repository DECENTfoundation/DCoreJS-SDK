import { RxHR, RxHttpRequest } from "@akanass/rx-http-request";
import { deserialize, serialize } from "class-transformer";
import * as _ from "lodash";
import { CoreOptions } from "request";
import { throwError } from "rxjs";
import { tag } from "rxjs-spy/operators";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { ApiAccessError } from "../../models/error";
import { ObjectNotFoundError } from "../../models/error/ObjectNotFoundError";
import { BaseRequest } from "../models/request/BaseRequest";
import { RpcResponse } from "../models/response/RpcResponse";
import { HttpJson } from "./HttpJson";
import { RpcApiGroupMap } from "./RpcApiGroupMap";
import { RpcEnabledApis } from "./RpcEnabledApis";

export class RpcService {
    private baseRequest: RxHttpRequest;

    constructor(options: CoreOptions) {
        this.baseRequest = RxHR.defaults(options);
    }

    public request<T>(request: BaseRequest<T>): Observable<T> {
        if (!_.includes(RpcEnabledApis, request.apiGroup)) {
            return throwError(new ApiAccessError(request.apiGroup));
        }
        return this.baseRequest.post("", { body: serialize(new HttpJson(request, RpcApiGroupMap.get(request.apiGroup))) }).pipe(
            map((data) => {
                if (data.response.statusCode === 200) {
                    const response = deserialize(RpcResponse, data.response.body);
                    if (!_.isNil(response.error)) {
                        throw new Error(response.error.message);
                    }
                    if (!_.isNil(response.result)
                        && (!_.isArray(response.result) || response.result.filter(Boolean).length > 0)) {
                        return request.transformer(response.result);
                    }
                    throw new ObjectNotFoundError(request.description());
                }
            }),
            tag("RpcEndpoints_request"),
        );
    }
}
