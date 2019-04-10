import * as _ from "lodash";
import { Observable } from "rxjs";
import { scalar } from "rxjs/internal/observable/scalar";
import { flatMap, map } from "rxjs/operators";
import { Credentials } from "../crypto/Credentials";
import { DCoreApi } from "../DCoreApi";
import { AssetAmount } from "../models/AssetAmount";
import { ChainObject } from "../models/ChainObject";
import { Content } from "../models/Content";
import { ContentKeys } from "../models/ContentKeys";
import { ApplicationType, CategoryType, contentType } from "../models/ContentTypes";
import { Memo } from "../models/Memo";
import { ObjectType } from "../models/ObjectType";
import { TransferOperation } from "../models/operation/TransferOperation";
import { SearchContentOrder } from "../models/order/SearchContentOrder";
import { REGION_NAMES, Regions } from "../models/Regions";
import { TransactionConfirmation } from "../models/TransactionConfirmation";
import { GenerateContentKeys } from "../net/models/request/GenerateContentKeys";
import { GetContentById } from "../net/models/request/GetContentById";
import { GetContentByUri } from "../net/models/request/GetContentByUri";
import { ListPublishingManagers } from "../net/models/request/ListPublishingManagers";
import { SearchContent } from "../net/models/request/SearchContent";
import { BaseApi } from "./BaseApi";

export class ContentApi extends BaseApi {

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Generate keys for new content submission.
     *
     * @param seeders list of seeder account IDs
     *
     * @return generated key and key parts
     */
    public generateKeys(seeders: ChainObject[]): Observable<ContentKeys> {
        return this.request(new GenerateContentKeys(seeders));
    }

    /**
     * Get content
     *
     * @param content uri of the content or object id of the content, 2.13.*
     *
     * @return a content if found, {@link ObjectNotFoundError} otherwise
     */
    public get(content: ChainObject | string): Observable<Content> {
        if (typeof content === "string" && ChainObject.isValid(content)) {
            return this.get(ChainObject.parse(content));
        } else if (typeof content === "string") {
            return this.request(new GetContentByUri(content));
        } else {
            return this.request(new GetContentById([content])).pipe(map((list) => list[0]));
        }
    }

    /**
     * Get all content by ids
     *
     * @param contentIds object id of the content, 2.13.*
     *
     * @return the contents
     */
    public getAll(contentIds: ChainObject[]): Observable<Content[]> {
        return this.request(new GetContentById(contentIds));
    }

    /**
     * Get a list of accounts holding publishing manager status.
     *
     * @param lowerBound the name of the first account to return. If the named account does not exist, the list will start at the account that comes after lowerbound
     * @param limit the maximum number of accounts to return (max: 100)
     *
     * @return a list of publishing managers
     */
    public listAllPublishersRelative(lowerBound: string, limit: number = 100): Observable<ChainObject[]> {
        return this.request(new ListPublishingManagers(lowerBound, limit));
    }

    /**
     * Search for term in contents (author, title and description).
     *
     * @param term search term
     * @param user content owner account name
     * @param regionCode two letter region code, defined in [Regions]
     * @param type the application and content type to be filtered, use {@link contentType} method
     * @param startId the id of content object to start searching from
     * @param order ordering field. Available options are defined in {@link SearchContentOrder}
     * @param limit maximum number of contents to fetch (must not exceed 100)
     *
     * @return the contents found
     */
    public findAll(
        term: string,
        user: string = "",
        regionCode: string = REGION_NAMES[Regions.All],
        type: string = contentType(ApplicationType.DecentCore, CategoryType.None),
        startId: ChainObject = ObjectType.Null.genericId(),
        order: SearchContentOrder = SearchContentOrder.CreatedDesc,
        limit: number = 100,
    ): Observable<Content[]> {
        return this.request(new SearchContent(term, order, user, regionCode, type, startId, limit));
    }

    /**
     * Transfers an amount of one asset to content. Amount is transferred to author and co-authors of the content, if they are specified.
     * Fees are paid by the "from" account.
     *
     * @param credentials account credentials
     * @param id content id
     * @param amount amount to send with asset type
     * @param memo optional unencrypted message
     * @param fee {@link AssetAmount} fee for the operation, if left undefined the fee will be computed in DCT asset
     *
     * @return a transfer operation
     */
    public createTransfer(
        credentials: Credentials,
        id: ChainObject,
        amount: AssetAmount,
        memo?: string,
        fee?: AssetAmount,
    ): Observable<TransferOperation> {
        return scalar(new TransferOperation(credentials.account, id, amount, _.isNil(memo) ? memo : Memo.createPublic(memo), fee));
    }

    /**
     * Transfers an amount of one asset to content. Amount is transferred to author and co-authors of the content, if they are specified.
     * Fees are paid by the "from" account.
     *
     * @param credentials account credentials
     * @param id content id
     * @param amount amount to send with asset type
     * @param memo optional unencrypted message
     * @param fee {@link AssetAmount} fee for the operation, if left undefined the fee will be computed in DCT asset
     *
     * @return a transaction confirmation
     */
    public transfer(
        credentials: Credentials,
        id: ChainObject,
        amount: AssetAmount,
        memo?: string,
        fee?: AssetAmount,
    ): Observable<TransactionConfirmation> {
        return this.createTransfer(credentials, id, amount, memo, fee).pipe(
            flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])),
        );
    }
}
