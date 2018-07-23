import * as _ from "lodash";
import { ChainObject } from "../../../models/ChainObject";
import { Purchase } from "../../../models/Purchase";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

// array
export class SearchBuyings extends BaseRequest<Purchase> {

    constructor(
        consumer: ChainObject,
        order: SearchAccountHistoryOrder = SearchAccountHistoryOrder.TimeDesc,
        startId: ChainObject = ChainObject.parse("1.7.0"),
        term: string,
        limit: number = 100,
    ) {
        super(
            ApiGroup.Database,
            "get_buying_objects_by_consumer",
            [consumer.objectId, order, startId.objectId, term, _.min([0, _.max([limit, 100])])],
            Purchase,
        );
    }
}
