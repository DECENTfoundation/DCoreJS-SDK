import { RxHR, RxHttpRequest } from "@akanass/rx-http-request";
import * as _ from "lodash";
import { CoreOptions } from "request";
import { tag } from "rxjs-spy/operators";
import { Observable } from "rxjs/internal/Observable";
import { filter, map } from "rxjs/operators";
import { DCoreError } from "../../models/error/DCoreError";
import { ObjectNotFoundError } from "../../models/error/ObjectNotFoundError";
import { ObjectCheckOf } from "../../utils/ObjectCheckOf";
import { BaseRequest } from "../models/request/BaseRequest";
import { DataResponse } from "../models/response/DataResponse";

export class RpcService {
    private baseRequest: RxHttpRequest;

    constructor(options: CoreOptions) {
        this.baseRequest = RxHR.defaults(options);
    }

    public request<T>(request: BaseRequest<T>): Observable<T> {
        return this.baseRequest.post("", { body: request.json() }).pipe(
            filter((data) => data.response.statusCode === 200),
            map((data) => JSON.parse(data.response.body)),
            map((response) => {
                if (ObjectCheckOf<DataResponse>(response, "id")) {
                    if (!_.isNil(response.error)) {
                        throw new DCoreError(response.error);
                    }
                    if (!_.isNil(response.result)
                        && (!_.isArray(response.result) || response.result.filter(Boolean).length > 0)) {
                        return request.transformer(response.result);
                    }
                    throw new ObjectNotFoundError(request.description());
                }
                throw TypeError("invalid response");
            }),
            tag("RpcEndpoints_request"),
        );
    }
}
