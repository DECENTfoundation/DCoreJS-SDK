import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class CancelAllSubscriptions extends BaseRequest<void> {
    public void: any = {};

    constructor() {
        super(
            ApiGroup.Database,
            "cancel_all_subscriptions",
            [],
            undefined,
            true,
        );
    }
}
