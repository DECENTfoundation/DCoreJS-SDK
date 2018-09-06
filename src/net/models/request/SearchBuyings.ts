import { plainToClass } from "class-transformer";
import * as _ from "lodash";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { SearchPurchasesOrder } from "../../../models/order/SearchPurchasesOrder";
import { Purchase } from "../../../models/Purchase";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class SearchBuyings extends BaseRequest<Purchase[]> {

    constructor(
        consumer: ChainObject,
        term: string,
        order: SearchPurchasesOrder = SearchPurchasesOrder.PurchasedDesc,
        startId: ChainObject = ObjectType.Null.genericId(),
        limit: number = 100,
    ) {
        super(
            ApiGroup.Database,
            "get_buying_objects_by_consumer",
            [consumer.objectId, order, startId.objectId, term, _.max([0, _.min([limit, 100])])],
            (value: object[]) => plainToClass(Purchase, value),
        );
    }
}
