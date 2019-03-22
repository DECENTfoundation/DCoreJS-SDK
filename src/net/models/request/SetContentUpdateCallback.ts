import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";
import { WithCallback } from "./WithCallback";

export class SetContentUpdateCallback extends BaseRequest<object> implements WithCallback {
    public callbackId: any = {};

    constructor(uri: string) {
        super(
            ApiGroup.Database,
            "set_content_update_callback",
            [uri],
        );
    }
}
