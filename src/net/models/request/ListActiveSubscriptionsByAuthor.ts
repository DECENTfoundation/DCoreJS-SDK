import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { Subscription } from "../../../models/Subscription";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class ListActiveSubscriptionsByAuthor extends BaseRequest<Subscription[]> {
    constructor(
        authorId: ChainObject,
        count: number = 100,
    ) {
        super(
            ApiGroup.Database,
            "list_active_subscriptions_by_consumer",
            [authorId.objectId, count],
            (value: object[]) => plainToClass(Subscription, value),
        );
    }
}
