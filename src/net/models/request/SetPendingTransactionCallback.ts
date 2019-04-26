import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";
import { WithCallback } from "./WithCallback";

export class SetPendingTransactionCallback extends BaseRequest<object> implements WithCallback {
    public callbackId: any = {};

    constructor() {
        super(
            ApiGroup.Database,
            "set_pending_transaction_callback",
            [],
        );
    }
}
