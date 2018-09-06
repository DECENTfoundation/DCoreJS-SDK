import { RxHR, RxHttpRequest } from "@akanass/rx-http-request";
import { deserialize, serialize } from "class-transformer";
import * as _ from "lodash";
import { CoreOptions } from "request";
import { tag } from "rxjs-spy/operators";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { NotFoundError } from "../../models/error/NotFoundError";
import { BaseRequest } from "../models/request/BaseRequest";
import { RpcResponse } from "../models/response/RpcResponse";

export class RpcEndpoints {
    private baseRequest: RxHttpRequest;

    constructor(options: CoreOptions) {
        this.baseRequest = RxHR.defaults(options);
    }

    public request<T>(request: BaseRequest<T>): Observable<T> {
        return this.baseRequest.post("", { body: serialize(request) }).pipe(
            map((data) => {
                if (data.response.statusCode === 200) {
                    const response = deserialize(RpcResponse, data.response.body);
                    if (!_.isNil(response.error)) {
                        throw new Error(response.error.message);
                    }
                    if (_.isObject(response.result)
                        && (!_.isArray(response.result) || response.result.filter(Boolean).length > 0)) {
                        return request.transformer(response.result);
                    }
                    // fixme fails for plain type requests eg. string
                    throw new NotFoundError(request.description());
                }
            }),
            tag("RpcEndpoints_request"),
        );
    }
}
