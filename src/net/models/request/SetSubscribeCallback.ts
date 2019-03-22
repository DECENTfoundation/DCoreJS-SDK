import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";
import { WithCallback } from "./WithCallback";

export class SetSubscribeCallback extends BaseRequest<object> implements WithCallback {
    public callbackId: any = {};

    constructor(clearFilter: boolean) {
        super(
            ApiGroup.Database,
            "set_subscribe_callback",
            [clearFilter],
        );
    }
}
