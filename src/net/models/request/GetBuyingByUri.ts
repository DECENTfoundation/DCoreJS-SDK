import { ChainObject } from "../../../models/ChainObject";
import { Purchase } from "../../../models/Purchase";
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
            [consumer, uri],
            Purchase,
        );
    }
}
