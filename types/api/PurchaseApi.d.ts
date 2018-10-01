import { Observable } from "rxjs";
import { DCoreSdk } from "../DCoreSdk";
import { ChainObject } from "../models/ChainObject";
import { SearchPurchasesOrder } from "../models/order/SearchPurchasesOrder";
import { Purchase } from "../models/Purchase";
export declare class PurchaseApi {
    private core;
    constructor(core: DCoreSdk);
    /**
     * search consumer open and history purchases
     *
     * @param consumer object id of the account, 1.2.*
     * @param order
     * @param from object id of the history object to start from, use {@link ObjectType.Null.genericId()} to ignore
     * @param term search term
     * @param limit number of entries, max 100
     */
    searchPurchases(consumer: ChainObject, term: string, order?: SearchPurchasesOrder, from?: ChainObject, limit?: number): Observable<Purchase[]>;
    /**
     * get consumer buying by content uri
     *
     * @param consumer object id of the account, 1.2.*
     * @param uri a uri of the content
     *
     * @return an account if found, {@link NotFoundError} otherwise
     */
    getPurchase(consumer: ChainObject, uri: string): Observable<Purchase>;
}
