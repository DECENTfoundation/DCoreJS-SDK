import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { ChainObject } from "../models/ChainObject";
import { ObjectType } from "../models/ObjectType";
import { SearchPurchasesOrder } from "../models/order/SearchPurchasesOrder";
import { Purchase } from "../models/Purchase";
import { GetBuyingByUri } from "../net/models/request/GetBuyingByUri";
import { SearchBuyings } from "../net/models/request/SearchBuyings";
import { BaseApi } from "./BaseApi";

export class PurchaseApi extends BaseApi {

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Get consumer purchase by content uri.
     *
     * @param consumer object id of the account, 1.2.*
     * @param uri a uri of the content
     *
     * @return an account if found, {@link ObjectNotFoundError} otherwise
     */
    public get(consumer: ChainObject, uri: string): Observable<Purchase> {
        return this.request(new GetBuyingByUri(consumer, uri));
    }

    /**
     * Search consumer open and history purchases.
     *
     * @param consumer object id of the account, 1.2.*
     * @param term search term
     * @param from object id of the history object to start from, use {@link ObjectType.Null.genericId} to ignore
     * @param order order defined by {@link SearchPurchasesOrder}
     * @param limit number of entries, max 100
     *
     * @return list of purchases
     */
    public findAll(
        consumer: ChainObject,
        term: string,
        from: ChainObject = ObjectType.Null.genericId(),
        order: SearchPurchasesOrder = SearchPurchasesOrder.PurchasedDesc,
        limit: number = 100,
    ): Observable<Purchase[]> {
        return this.request(new SearchBuyings(consumer, term, order, from, limit));
    }

}
