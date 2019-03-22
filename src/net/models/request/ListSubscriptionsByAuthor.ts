import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { Subscription } from "../../../models/Subscription";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class ListSubscriptionsByAuthor extends BaseRequest<Subscription[]> {
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

        assertThrow(consumerId.objectType === ObjectType.Account, () => "not a valid account object id");
    }
}
