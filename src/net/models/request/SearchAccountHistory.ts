import { plainToClass } from "class-transformer";
import * as _ from "lodash";
import { ChainObject } from "../../../models/ChainObject";
import { SearchAccountHistoryOrder } from "../../../models/order/SearchAccountHistoryOrder";
import { TransactionDetail } from "../../../models/TransactionDetail";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class SearchAccountHistory extends BaseRequest<TransactionDetail[]> {

    constructor(
        accountId: ChainObject,
        order: SearchAccountHistoryOrder = SearchAccountHistoryOrder.TimeDesc,
        startId: ChainObject = ChainObject.parse("1.7.0"),
        limit: number = 100,
    ) {
        super(
            ApiGroup.Database,
            "search_account_history",
            [accountId.objectId, order, startId.objectId, _.max([0, _.min([limit, 100])])],
            (value: object[]) => plainToClass(TransactionDetail, value),
        );
    }
}
