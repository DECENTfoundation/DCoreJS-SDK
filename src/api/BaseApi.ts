import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { BaseRequest } from "../net/models/request/BaseRequest";
import { WithCallback } from "../net/models/request/WithCallback";

export abstract class BaseApi {
    protected constructor(protected api: DCoreApi) {

    }

    protected request<T>(request: BaseRequest<T>): Observable<T> {
        return this.api.request(request);
    }

    protected requestWithCallback<T>(request: BaseRequest<T> & WithCallback): Observable<T> {
        return this.api.requestWithCallback(request);
    }
}
