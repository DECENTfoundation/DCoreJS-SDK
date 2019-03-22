import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class CancelAllSubscriptions extends BaseRequest<void> {
    constructor() {
        super(
            ApiGroup.Database,
            "cancel_all_subscriptions",
            [],
        );
    }
}
