import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";
import { WithCallback } from "./WithCallback";

export class SetBlockAppliedCallback extends BaseRequest<object> implements WithCallback {
    public callbackId: any = {};

    constructor() {
        super(
            ApiGroup.Database,
            "set_block_applied_callback",
            [],
        );
    }
}
