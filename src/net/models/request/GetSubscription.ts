import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { Subscription } from "../../../models/Subscription";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetSubscription extends BaseRequest<Subscription> {
    constructor(
        subscriptionId: ChainObject,
    ) {
        super(
            ApiGroup.Database,
            "get_subscription",
            [subscriptionId.objectId],
            (value: object) => plainToClass(Subscription, value),
        );
    }
}
