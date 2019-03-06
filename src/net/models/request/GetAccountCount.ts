import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetAccountCount extends BaseRequest<number> {
    constructor() {
        super(
            ApiGroup.Database,
            "get_account_count",
            [],
        );
    }
}
