import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { Subscription } from "../../../models/Subscription";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class ListActiveSubscriptionsByConsumer extends BaseRequest<Subscription[]> {
    constructor(
        consumerId: ChainObject,
        count: number = 100,
    ) {
        super(
            ApiGroup.Database,
            "list_active_subscriptions_by_consumer",
            [consumerId.objectId, count],
            (value: object[]) => plainToClass(Subscription, value),
        );
    }
}
