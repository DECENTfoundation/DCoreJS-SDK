import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { Subscription } from "../../../models/Subscription";
import { assertThrow } from "../../../utils/Utils";
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

        assertThrow(subscriptionId.objectType === ObjectType.SubscriptionObject, () => "not a valid subscription object id");
    }
}
