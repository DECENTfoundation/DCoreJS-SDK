import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetChainId extends BaseRequest<string> {
    constructor() {
        super(
            ApiGroup.Database,
            "get_chain_id",
            [],
        );
    }
}
