import { RxHR, RxHttpRequest } from "@akanass/rx-http-request";
import { ILogger } from "js-logger/src/types";
import * as _ from "lodash";
import { CoreOptions } from "request";
import { Observable, of } from "rxjs";
import { tag } from "rxjs-spy/operators";
import { filter, flatMap, map } from "rxjs/operators";
import { DCoreError } from "../../models/error/DCoreError";
import { ObjectNotFoundError } from "../../models/error/ObjectNotFoundError";
import { ObjectCheckOf } from "../../utils/ObjectCheckOf";
import { log } from "../../utils/Utils";
import { BaseRequest } from "../models/request/BaseRequest";
import { DataResponse } from "../models/response/DataResponse";

export class RpcService {
    private baseRequest: RxHttpRequest;
    private logger?: ILogger;

    constructor(options: CoreOptions, logger?: ILogger) {
        this.baseRequest = RxHR.defaults(options);
        this.logger = logger;
    }

    public request<T>(request: BaseRequest<T>): Observable<T> {
        return of(request.json()).pipe(
            tag(`API_send_${request.method}`),
            log(`API_send_${request.method}`, this.logger),
            flatMap((serialized) => this.baseRequest.post("", { body: serialized })),
            filter((data) => data.response.statusCode === 200),
            map((data) => JSON.parse(data.response.body)),
            map((response) => {
                if (ObjectCheckOf<DataResponse>(response, "id")) {
                    if (!_.isNil(response.error)) {
                        throw new DCoreError(response.error);
                    }
                    if (!request.allowNull && (_.isNil(response.result) || (_.isArray(response.result) && response.result.length === 1 && response.result[0] === null))) {
                        throw new ObjectNotFoundError(request.description());
                    }
                    return request.transformer(response.result);
                }
                throw TypeError("invalid response");
            }),
            tag("RpcEndpoints_request"),
        );
    }
}
