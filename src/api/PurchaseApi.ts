import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { ChainObject } from "../models/ChainObject";
import { ObjectType } from "../models/ObjectType";
import { SearchPurchasesOrder } from "../models/order/SearchPurchasesOrder";
import { Purchase } from "../models/Purchase";
import { GetBuyingByUri } from "../net/models/request/GetBuyingByUri";
import { GetHistoryBuyingsByConsumer } from "../net/models/request/GetHistoryBuyingsByConsumer";
import { GetOpenBuyings } from "../net/models/request/GetOpenBuyings";
import { GetOpenBuyingsByConsumer } from "../net/models/request/GetOpenBuyingsByConsumer";
import { GetOpenBuyingsByUri } from "../net/models/request/GetOpenBuyingsByUri";
import { SearchBuyings } from "../net/models/request/SearchBuyings";
import { SearchFeedback } from "../net/models/request/SearchFeedback";
import { BaseApi } from "./BaseApi";

export class PurchaseApi extends BaseApi {

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Get a list of history purchases for consumer id.
     *
     * @param accountId consumer account object id, 1.2.*
     *
     * @return a list of history purchases
     */
    public getAllHistory(accountId: ChainObject): Observable<Purchase[]> {
        return this.request(new GetHistoryBuyingsByConsumer(accountId));
    }

    /**
     * Get a list of open purchases.
     *
     * @return a list of open purchases
     */
    public getAllOpen(): Observable<Purchase[]> {
        return this.request(new GetOpenBuyings());
    }

    /**
     * Get a list of open purchases for content URI.
     *
     * @param uri content uri
     *
     * @return a list of open purchases
     */
    public getAllOpenByUri(uri: string): Observable<Purchase[]> {
        return this.request(new GetOpenBuyingsByUri(uri));
    }

    /**
     * Get a list of open purchases for consumer id.
     *
     * @param accountId consumer account object id, 1.2.*
     *
     * @return a list of open purchases
     */
    public getAllOpenByAccount(accountId: ChainObject): Observable<Purchase[]> {
        return this.request(new GetOpenBuyingsByConsumer(accountId));
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

    /**
     * Search for feedback.
     *
     * @param uri content URI
     * @param user feedback author account name
     * @param count maximum number of feedback objects to fetch
     * @param startId the id of purchase object to start searching from
     *
     * @return a list of purchase objects
     */
    // todo wait for add feedback OP so we can test
    public findAllForFeedback(
        uri: string,
        user?: string,
        count: number = 100,
        startId: ChainObject = ObjectType.Null.genericId(),
    ): Observable<Purchase[]> {
        return this.request(new SearchFeedback(uri, user, startId, count));
    }
}
