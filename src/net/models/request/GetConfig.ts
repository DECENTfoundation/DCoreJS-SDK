import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetConfig extends BaseRequest<object> {
    constructor() {
        super(
            ApiGroup.Database,
            "get_config",
            [],
        );
    }
}
