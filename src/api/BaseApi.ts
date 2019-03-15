import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { BaseRequest } from "../net/models/request/BaseRequest";
import { WithCallback } from "../net/models/request/WithCallback";
import { ObjectCheckOf } from "../utils/ObjectCheckOf";

export abstract class BaseApi {
    protected constructor(protected api: DCoreApi) {

    }

    protected request<T>(request: BaseRequest<T> | BaseRequest<T> & WithCallback): Observable<T> {
        if (ObjectCheckOf<WithCallback>(request, "callbackId")) {
            return this.api.requestStream(request);
        } else {
            return this.api.request(request);
        }
    }
}
