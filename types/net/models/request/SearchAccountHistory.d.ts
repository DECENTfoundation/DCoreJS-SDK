import { ChainObject } from "../../../models/ChainObject";
import { SearchAccountHistoryOrder } from "../../../models/order/SearchAccountHistoryOrder";
import { TransactionDetail } from "../../../models/TransactionDetail";
import { BaseRequest } from "./BaseRequest";
export declare class SearchAccountHistory extends BaseRequest<TransactionDetail[]> {
    constructor(accountId: ChainObject, order?: SearchAccountHistoryOrder, startId?: ChainObject, limit?: number);
}
