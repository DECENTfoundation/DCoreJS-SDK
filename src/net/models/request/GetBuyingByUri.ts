import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { Purchase } from "../../../models/Purchase";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetBuyingByUri extends BaseRequest<Purchase> {
    constructor(
        consumer: ChainObject,
        uri: string,
    ) {
        super(
            ApiGroup.Database,
            "get_buying_by_consumer_URI",
            [consumer.objectId, uri],
            (value: object) => plainToClass(Purchase, value),
        );

        assertThrow(consumer.objectType === ObjectType.Account, () => "not a valid account object id");
    }
}
