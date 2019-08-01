import { RxHR, RxHttpRequest } from "@akanass/rx-http-request";
import * as _ from "lodash";
import { Logger } from "pino";
import { CoreOptions } from "request";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { DCoreError } from "../../models/error/DCoreError";
import { ObjectNotFoundError } from "../../models/error/ObjectNotFoundError";
import { ObjectCheckOf } from "../../utils/ObjectCheckOf";
import { debug } from "../../utils/Utils";
import { BaseRequest } from "../models/request/BaseRequest";
import { DataResponse } from "../models/response/DataResponse";

export class RpcService {
    private baseRequest: RxHttpRequest;
    private readonly logger: Logger;

    constructor(options: CoreOptions, logger: Logger) {
        this.baseRequest = RxHR.defaults(options);
        this.logger = logger;
    }

    public request<T>(request: BaseRequest<T>): Observable<T> {
        const serialized = request.json();
        this.logger.info(`API_send_${request.method} #value: ${serialized}`);
        return this.baseRequest.post("", { body: serialized }).pipe(
            filter((data) => data.response.statusCode === 200),
            map((data) => JSON.parse(data.response.body)),
            debug(`RpcService_request_${request.method}_plain`, this.logger),
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
            debug(`RpcService_request_${request.method}`, this.logger),
        );
    }
}
