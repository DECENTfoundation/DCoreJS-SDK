import { API_GROUP_NAMES, ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

/**
 * Obsolete, all APIs are open by default
 */
export class RequestApiAccess extends BaseRequest<number> {
    constructor(api: ApiGroup) {
        super(
            ApiGroup.Login,
            API_GROUP_NAMES[api],
            [],
        );
    }
}
