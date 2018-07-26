import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class RequestApiAccess extends BaseRequest<number> {
    constructor(api: ApiGroup) {
        super(
            ApiGroup.Login,
            api,
            [],
        );
    }
}
