import { serialize } from "class-transformer";
import * as _ from "lodash";
import { Moment } from "moment";
import { Observable, of } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { Credentials } from "../crypto/Credentials";
import { DCoreApi } from "../DCoreApi";
import { Fee } from "../DCoreSdk";
import { AssetAmount } from "../models/AssetAmount";
import { ChainObject } from "../models/ChainObject";
import { Content } from "../models/Content";
import { ContentKeys } from "../models/ContentKeys";
import { ApplicationType, CategoryType, contentType } from "../models/ContentTypes";
import { Memo } from "../models/Memo";
import { ObjectType } from "../models/ObjectType";
import { AddOrUpdateContentOperation } from "../models/operation/AddOrUpdateContentOperation";
import { PurchaseContentOperation } from "../models/operation/PurchaseContentOperation";
import { RemoveContentOperation } from "../models/operation/RemoveContentOperation";
import { TransferOperation } from "../models/operation/TransferOperation";
import { SearchContentOrder } from "../models/order/SearchContentOrder";
import { RegionalPrice } from "../models/RegionalPrice";
import { REGION_NAMES, Regions } from "../models/Regions";
import { Synopsis } from "../models/Synopsis";
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
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     *
     * @return a transfer operation
     */
    public createTransfer(
        credentials: Credentials,
        id: ChainObject,
        amount: AssetAmount,
        memo?: string,
        fee?: Fee,
    ): Observable<TransferOperation> {
        return of(new TransferOperation(credentials.account, id, amount, _.isNil(memo) ? memo : Memo.createPublic(memo), fee));
    }

    /**
     * Transfers an amount of one asset to content. Amount is transferred to author and co-authors of the content, if they are specified.
     * Fees are paid by the "from" account.
     *
     * @param credentials account credentials
     * @param id content id
     * @param amount amount to send with asset type
     * @param memo optional unencrypted message
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     *
     * @return a transaction confirmation
     */
    public transfer(
        credentials: Credentials,
        id: ChainObject,
        amount: AssetAmount,
        memo?: string,
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createTransfer(credentials, id, amount, memo, fee).pipe(
            flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])),
        );
    }

    /**
     * Create a purchase content operation.
     *
     * @param credentials account credentials
     * @param content uri of the content or object id of the content, 2.13.*
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     *
     * @return a purchase content operation
     */
    public createPurchaseOperation(credentials: Credentials, content: ChainObject | string, fee?: Fee): Observable<PurchaseContentOperation> {
        return this.api.contentApi.get(content).pipe(map((c) => PurchaseContentOperation.create(credentials, c, fee)));
    }

    /**
     * Purchase a content.
     *
     * @param credentials account credentials
     * @param content uri of the content or object id of the content, 2.13.*
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     *
     * @return a transaction confirmation
     */
    public purchase(credentials: Credentials, content: ChainObject | string, fee?: Fee): Observable<TransactionConfirmation> {
        return this.createPurchaseOperation(credentials, content, fee).pipe(
            flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])),
        );
    }

    /**
     * Create remove content operation. Sets expiration to head block time, so the content cannot be purchased, but remains in database.
     *
     * @param content content id or uri
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public createRemoveContentOperation(content: ChainObject | string, fee?: Fee): Observable<RemoveContentOperation> {
        return this.get(content).pipe(map((c) => new RemoveContentOperation(c.author, c.uri, fee)));
    }

    /**
     * Remove content. Sets expiration to head block time, so the content cannot be purchased, but remains in database.
     *
     * @param credentials author credentials
     * @param content content id or uri
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public remove(credentials: Credentials, content: ChainObject | string, fee?: Fee): Observable<TransactionConfirmation> {
        return this.createRemoveContentOperation(content, fee).pipe(
            flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])),
        );
    }

    /**
     * Create request to submit content operation.
     *
     * @param author author of the content. If co-authors is not filled, this account will receive full payout
     * @param coAuthors if map is not empty, payout will be split - the parameter maps co-authors
     * to basis points split, e.g. author1:9000 (bp), author2:1000 (bp)
     * @param uri URI where the content can be found
     * @param price list of regional prices
     * @param expiration content expiration time
     * @param synopsis JSON formatted structure containing content information
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public createAddContentOperation(
        author: ChainObject,
        coAuthors: Array<[ChainObject, number]>,
        uri: string,
        price: RegionalPrice[],
        expiration: Moment,
        synopsis: Synopsis,
        fee?: Fee,
    ): Observable<AddOrUpdateContentOperation> {
        return of(AddOrUpdateContentOperation.create(author, coAuthors, uri, price, expiration, synopsis, fee));
    }

    /**
     * Add content.
     *
     * @param credentials author credentials. If co-authors is not filled, this account will receive full payout
     * @param coAuthors if map is not empty, payout will be split - the parameter maps co-authors
     * to basis points split, e.g. author1:9000 (bp), author2:1000 (bp)
     * @param uri URI where the content can be found
     * @param price list of regional prices
     * @param expiration content expiration time
     * @param synopsis JSON formatted structure containing content information
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public add(
        credentials: Credentials,
        coAuthors: Array<[ChainObject, number]>,
        uri: string,
        price: RegionalPrice[],
        expiration: Moment,
        synopsis: Synopsis,
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createAddContentOperation(credentials.account, coAuthors, uri, price, expiration, synopsis, fee).pipe(
            flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])),
        );
    }

    /**
     * Create request to update content operation. Update parameters are functions that have current values as arguments.
     *
     * @param content content id or uri
     * @param coAuthors if map is not empty, payout will be split - the parameter maps co-authors
     * to basis points split, e.g. author1:9000 (bp), author2:1000 (bp)
     * @param price list of regional prices
     * @param synopsis JSON formatted structure containing content information
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public createUpdateContentOperation(
        content: ChainObject | string,
        coAuthors?: (old: Array<[ChainObject, number]>) => Array<[ChainObject, number]>,
        price?: (old: RegionalPrice[]) => RegionalPrice[],
        synopsis?: (old: Synopsis) => Synopsis,
        fee?: Fee,
    ): Observable<AddOrUpdateContentOperation> {
        return this.get(content).pipe(
            map((c) => new AddOrUpdateContentOperation(
                c.size,
                c.author,
                coAuthors ? coAuthors(c.coAuthors) : c.coAuthors,
                c.uri,
                c.quorum,
                price ? price(c.price.regionalPrices) : c.price.regionalPrices,
                c.hash,
                Array.from(c.seederPrice.keys()),
                Array.from(c.keyParts.values()),
                c.expiration,
                c.publishingFeeEscrow,
                serialize(synopsis ? synopsis(c.synopsis) : c.synopsis),
                c.custodyData,
                fee,
            )));
    }

    /**
     * Update content. Update parameters are functions that have current values as arguments.
     *
     * @param credentials author credentials
     * @param content content id or uri
     * @param coAuthors if map is not empty, payout will be split - the parameter maps co-authors
     * to basis points split, e.g. author1:9000 (bp), author2:1000 (bp)
     * @param price list of regional prices
     * @param synopsis JSON formatted structure containing content information
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public update(
        credentials: Credentials,
        content: ChainObject | string,
        synopsis?: (old: Synopsis) => Synopsis,
        price?: (old: RegionalPrice[]) => RegionalPrice[],
        coAuthors?: (old: Array<[ChainObject, number]>) => Array<[ChainObject, number]>,
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createUpdateContentOperation(content, coAuthors, price, synopsis, fee).pipe(
            flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])),
        );
    }

}
