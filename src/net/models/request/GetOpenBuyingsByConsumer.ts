import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { Purchase } from "../../../models/Purchase";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetOpenBuyingsByConsumer extends BaseRequest<Purchase[]> {
    constructor(consumer: ChainObject) {
        super(
            ApiGroup.Database,
            "get_open_buyings_by_consumer",
            [consumer],
            (value: object[]) => plainToClass(Purchase, value),
        );
    }
}
