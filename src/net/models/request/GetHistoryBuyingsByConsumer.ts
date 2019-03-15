import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { Purchase } from "../../../models/Purchase";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetHistoryBuyingsByConsumer extends BaseRequest<Purchase[]> {
    constructor(consumer: ChainObject) {
        super(
            ApiGroup.Database,
            "get_buying_history_objects_by_consumer",
            [consumer.objectId],
            (value: object[]) => plainToClass(Purchase, value),
        );
    }
}
