import { RxHR } from "@akanass/rx-http-request";
import { deserialize, plainToClass, serialize } from "class-transformer";
import * as _ from "lodash";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { NotFoundError } from "../../models/error/NotFoundError";
import { BaseRequest } from "../models/request/BaseRequest";
import { RpcResponse } from "../models/response/RpcResponse";

export class RpcEndpoints {
    private baseRequest = RxHR.defaults({
        baseUrl: "http://stage.decentgo.com:8089/rpc",
        timeout: 15000,
    });

    public makeRequest<T>(request: BaseRequest<T>): Observable<T | T[]> {
        return this.baseRequest.post("", { body: serialize(request) }).pipe(
            map((data) => {
                if (data.response.statusCode === 200) {
                    const response = deserialize(RpcResponse, data.response.body);
                    if (!_.isNil(response.error)) {
                        throw Error(response.error.message);
                    }
                    if (_.isObject(response.result)
                        && (!_.isArray(response.result) || response.result.filter(Boolean).length > 0)) {
                        return plainToClass(request.returnClass, response.result);
                    }
                    throw new NotFoundError(request.description());
                }
            }),
        );
    }
}
