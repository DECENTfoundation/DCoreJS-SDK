import { ChainObject } from "../../../models/ChainObject";
import { SearchPurchasesOrder } from "../../../models/order/SearchPurchasesOrder";
import { Purchase } from "../../../models/Purchase";
import { BaseRequest } from "./BaseRequest";
export declare class SearchBuyings extends BaseRequest<Purchase[]> {
    constructor(consumer: ChainObject, term: string, order?: SearchPurchasesOrder, startId?: ChainObject, limit?: number);
}
