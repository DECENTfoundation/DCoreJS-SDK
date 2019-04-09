import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";
import { Void } from "./Void";

export class CancelAllSubscriptions extends BaseRequest<void> implements Void {
    public void: any = {};

    constructor() {
        super(
            ApiGroup.Database,
            "cancel_all_subscriptions",
            [],
        );
    }
}
