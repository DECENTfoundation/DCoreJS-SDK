import { RxHR, RxHttpRequest } from "@akanass/rx-http-request";
import { deserialize, serialize } from "class-transformer";
import * as _ from "lodash";
import { CoreOptions } from "request";
import { throwError } from "rxjs";
import { tag } from "rxjs-spy/operators";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { ApiAccessError } from "../../models/error/ApiAccessError";
import { NotFoundError } from "../../models/error/NotFoundError";
import { ApiGroup } from "../models/ApiGroup";
import { BaseRequest } from "../models/request/BaseRequest";
import { RpcResponse } from "../models/response/RpcResponse";

export class RpcEndpoints {
    private baseRequest: RxHttpRequest;

    constructor(options: CoreOptions) {
        this.baseRequest = RxHR.defaults(options);
    }

    public request<T>(request: BaseRequest<T>): Observable<T> {
        if (request.apiGroup !== ApiGroup.Database) {
            return throwError(new ApiAccessError(request.apiGroup));
        }
        return this.baseRequest.post("", { body: serialize(request) }).pipe(
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
                    throw new NotFoundError(request.description());
                }
            }),
            tag("RpcEndpoints_request"),
        );
    }
}
