import { Observable } from "rxjs";
import { scalar } from "rxjs/internal/observable/scalar";
import { flatMap } from "rxjs/operators";
import { Credentials } from "../crypto/Credentials";
import { DCoreApi } from "../DCoreApi";
import { ChainObject } from "../models/ChainObject";
import { ObjectType } from "../models/ObjectType";
import { LeaveRatingAndCommentOperation } from "../models/operation/LeaveRatingAndCommentOperation";
import { SearchPurchasesOrder } from "../models/order/SearchPurchasesOrder";
import { PubKey } from "../models/PubKey";
import { Purchase } from "../models/Purchase";
import { TransactionConfirmation } from "../models/TransactionConfirmation";
import { GetBuyingByUri } from "../net/models/request/GetBuyingByUri";
import { GetHistoryBuyingsByConsumer } from "../net/models/request/GetHistoryBuyingsByConsumer";
import { GetOpenBuyings } from "../net/models/request/GetOpenBuyings";
import { GetOpenBuyingsByConsumer } from "../net/models/request/GetOpenBuyingsByConsumer";
import { GetOpenBuyingsByUri } from "../net/models/request/GetOpenBuyingsByUri";
import { RestoreEncryptionKey } from "../net/models/request/RestoreEncryptionKey";
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

    /**
     * Restores encryption key from key parts stored in buying object.
     *
     * @param elGamalPrivate the private El Gamal key
     * @param purchaseId the purchase object
     *
     * @return AES encryption key
     */
    public restoreEncryptionKey(elGamalPrivate: PubKey, purchaseId: ChainObject): Observable<string> {
        return this.request(new RestoreEncryptionKey(elGamalPrivate, purchaseId));
    }

    /**
     * Create a rate and comment content operation.
     *
     * @param uri a uri of the content
     * @param consumer object id of the account, 1.2.*
     * @param rating 1-5 stars
     * @param comment max 100 chars
     * @param feeAssetId fee asset id for the operation, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     *
     * @return a rate and comment content operation
     */
    public createRateAndCommentOperation(
        uri: string,
        consumer: ChainObject,
        rating: 1 | 2 | 3 | 4 | 5,
        comment: string,
        feeAssetId?: ChainObject,
    ): Observable<LeaveRatingAndCommentOperation> {
        return scalar(new LeaveRatingAndCommentOperation(uri, consumer, rating, comment, feeAssetId));
    }

    /**
     * Rate and comment content operation.
     *
     * @param credentials account credentials
     * @param uri a uri of the content
     * @param rating 1-5 stars
     * @param comment max 100 chars
     * @param feeAssetId fee asset id for the operation, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     *
     * @return a rate and comment content operation
     */
    public rateAndComment(
        credentials: Credentials,
        uri: string,
        rating: 1 | 2 | 3 | 4 | 5,
        comment: string,
        feeAssetId?: ChainObject,
    ): Observable<TransactionConfirmation> {
        return this.createRateAndCommentOperation(uri, credentials.account, rating, comment, feeAssetId).pipe(
            flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])),
        );
    }
}
