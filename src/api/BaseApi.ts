import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { BaseRequest } from "../net/models/request/BaseRequest";

export abstract class BaseApi {
    protected constructor(protected api: DCoreApi) {

    }

    protected request<T>(request: BaseRequest<T>): Observable<T> {
        return this.api.request(request);
    }
}
