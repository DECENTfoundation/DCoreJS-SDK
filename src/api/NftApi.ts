import { Observable, of } from "rxjs";
import { flatMap, map, tap } from "rxjs/operators";
import { Credentials } from "../crypto/Credentials";
import { DCoreApi } from "../DCoreApi";
import { Fee, NftRef } from "../DCoreSdk";
import { ChainObject } from "../models/ChainObject";
import { Memo } from "../models/Memo";
import { Nft } from "../models/Nft";
import { NftData } from "../models/NftData";
import { NftDataType } from "../models/NftDataType";
import { NftOptions } from "../models/NftOptions";
import { NftCreateOperation } from "../models/operation/NftCreateOperation";
import { NftIssueOperation } from "../models/operation/NftIssueOperation";
import { NftTransferOperation } from "../models/operation/NftTransferOperation";
import { NftUpdateDataOperation } from "../models/operation/NftUpdateDataOperation";
import { NftUpdateOperation } from "../models/operation/NftUpdateOperation";
import { TransactionConfirmation } from "../models/TransactionConfirmation";
import { GetNftBalances } from "../net/models/request/GetNftBalances";
import { GetNftCount } from "../net/models/request/GetNftCount";
import { GetNftData } from "../net/models/request/GetNftData";
import { GetNftDataCount } from "../net/models/request/GetNftDataCount";
import { GetNfts } from "../net/models/request/GetNfts";
import { GetNftsBySymbol } from "../net/models/request/GetNftsBySymbol";
import { ListNftData } from "../net/models/request/ListNftData";
import { ListNfts } from "../net/models/request/ListNfts";
import { assertThrow } from "../utils/Utils";
import { BaseApi } from "./BaseApi";

export class NftApi extends BaseApi {

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Get NFTs by id
     *
     * @param ids NFT object ids
     *
     * @return NFT objects, or [ObjectNotFoundException] if none found
     */
    public getAll(ids: ChainObject[]): Observable<Nft[]> {
        return this.request(new GetNfts(ids));
    }

    /**
     * Get NFTs by symbol
     *
     * @param symbols NFT symbols
     *
     * @return NFT objects, or [ObjectNotFoundException] if none found
     */
    public getAllBySymbol(symbols: string[]): Observable<Nft[]> {
        return this.request(new GetNftsBySymbol(symbols));
    }

    /**
     * Get NFT by id or symbol
     *
     * @param nft NFT object id or symbol
     *
     * @return NFT object, or [ObjectNotFoundException] if none found
     */
    public get(nft: NftRef): Observable<Nft> {
        if (typeof nft === "string") {
            return this.getAllBySymbol([nft]).pipe(map((it) => it[0]));
        } else {
            return this.getAll([nft]).pipe(map((it) => it[0]));
        }
    }

    /**
     * Get NFT data instances with raw model
     *
     * @param ids NFT data object ids
     *
     * @return NFT data objects, or [ObjectNotFoundException] if none found
     */
    public getAllDataRaw(ids: ChainObject[]): Observable<NftData[]> {
        return this.request(new GetNftData(ids));
    }

    /**
     * Get NFT data instance with raw model
     *
     * @param id NFT data object id
     *
     * @return NFT data object, or [ObjectNotFoundException] if none found
     */
    public getDataRaw(id: ChainObject): Observable<NftData> {
        return this.getAllDataRaw([id]).pipe(map((it) => it[0]));
    }

    /**
     * Count all NFTs
     *
     * @return count of NFT definitions
     */
    public countAll(): Observable<number> {
        return this.request(new GetNftCount());
    }

    /**
     * Count all NFT data instances
     *
     * @return count of NFT data instances
     */
    public countAllData(): Observable<number> {
        return this.request(new GetNftDataCount());
    }

    /**
     * Get NFT balances per account with raw model
     *
     * @param account account object id
     * @param nftIds NFT object ids to filter, or empty list to fetch all
     *
     * @return NFT data instances with raw model
     */
    public getNftBalancesRaw(account: ChainObject, nftIds: ChainObject[] = []): Observable<NftData[]> {
        return this.request(new GetNftBalances(account, nftIds));
    }

    /**
     * Get NFTs alphabetically by symbol name
     *
     * @param lowerBound lower bound of symbol names to retrieve
     * @param limit maximum number of NFTs to fetch (must not exceed 100)
     *
     * @return the NFTs found
     */
    public listAllRelative(lowerBound: string = "", limit: number = 100): Observable<Nft[]> {
        return this.request(new ListNfts(lowerBound, limit));
    }

    /**
     * Get NFT data instances with raw model
     *
     * @param nftId NFT object id
     *
     * @return NFT data objects
     */
    public listDataByNftRaw(nftId: ChainObject): Observable<NftData[]> {
        return this.request(new ListNftData(nftId));
    }

    /**
     * Create NFT create operation
     *
     * @param symbol NFT symbol
     * @param options NFT options
     * @param definitions NFT model data definitions
     * @param transferable allow transfer of NFT data instances to other accounts
     * @param fee [Fee] fee for the operation, by default the fee will be computed in DCT asset.
     * When set to other then DCT, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public createNftCreateOperation(
        symbol: string,
        options: NftOptions,
        definitions: NftDataType[],
        transferable: boolean,
        fee?: Fee,
    ): Observable<NftCreateOperation> {
        return of(new NftCreateOperation(symbol, options, definitions, transferable, fee));
    }

    /**
     * Create NFT
     *
     * @param credentials account credentials issuing the NFT
     * @param symbol NFT symbol
     * @param maxSupply NFT max supply
     * @param fixedMaxSupply NFT max supply is fixed and cannot be changed with update
     * @param description text description
     * @param definitions NFT model data definitions
     * @param transferable allow transfer of NFT data instances to other accounts
     * @param fee [Fee] fee for the operation, by default the fee will be computed in DCT asset.
     * When set to other then DCT, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public create(
        credentials: Credentials,
        symbol: string,
        maxSupply: number,
        fixedMaxSupply: boolean,
        description: string,
        definitions: NftDataType[],
        transferable: boolean,
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createNftCreateOperation(
            symbol, new NftOptions(credentials.account, maxSupply, fixedMaxSupply, description), definitions, transferable, fee,
        ).pipe(flatMap((operation) =>
            this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [operation])));
    }

    /**
     * Create NFT update operation. Fills model with actual values.
     *
     * @param nft NFT object id or symbol
     * @param fee [Fee] fee for the operation, by default the fee will be computed in DCT asset.
     * When set to other then DCT, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public createUpdateOperation(
        nft: NftRef,
        fee?: Fee,
    ): Observable<NftUpdateOperation> {
        return this.get(nft).pipe(map((it) => new NftUpdateOperation(it.options.issuer, it.id, it.options, fee)));
    }

    /**
     * Update NFT
     *
     * @param credentials issuer account credentials
     * @param nft NFT object id or symbol
     * @param maxSupply update max supply
     * @param fixedMaxSupply update max supply is fixed
     * @param description update text description
     * @param fee [Fee] fee for the operation, by default the fee will be computed in DCT asset.
     * When set to other then DCT, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public update(
        credentials: Credentials,
        nft: NftRef,
        maxSupply?: number,
        fixedMaxSupply?: boolean,
        description?: string,
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createUpdateOperation(nft, fee).pipe(
            tap((it) => it.options = it.options.update(maxSupply, fixedMaxSupply, description)),
            flatMap((it) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [it])),
        );
    }

    /**
     * Create NFT issue operation. Creates a NFT data instance.
     *
     * @param issuer NFT issuer
     * @param nft NFT object id or symbol
     * @param to account object id receiving the NFT data instance
     * @param data data model with values
     * @param memo optional message
     * @param fee [Fee] fee for the operation, by default the fee will be computed in DCT asset.
     * When set to other then DCT, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public createIssueOperation(
        issuer: ChainObject,
        nft: NftRef,
        to: ChainObject,
        data: any[],
        memo?: Memo,
        fee?: Fee,
    ): Observable<NftIssueOperation> {
        return this.getId(nft).pipe(map((it) => new NftIssueOperation(issuer, it, to, data, memo, fee)));
    }

    /**
     * Issue NFT. Creates a NFT data instance.
     *
     * @param credentials NFT issuer credentials
     * @param nft NFT object id or symbol
     * @param to account object id receiving the NFT data instance
     * @param data data model with values
     * @param memo optional message
     * @param fee [Fee] fee for the operation, by default the fee will be computed in DCT asset.
     * When set to other then DCT, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public issue(
        credentials: Credentials,
        nft: NftRef,
        to: ChainObject,
        data: any[],
        memo?: Memo,
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createIssueOperation(credentials.account, nft, to, data, memo, fee).pipe(
            flatMap((it) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [it])),
        );
    }

    /**
     * Create NFT data instance transfer operation
     *
     * @param from NFT data instance owner account object id
     * @param to receiver account object id
     * @param id NFT data instance object id
     * @param memo optional message
     * @param fee [Fee] fee for the operation, by default the fee will be computed in DCT asset.
     * When set to other then DCT, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public createTransferOperation(
        from: ChainObject,
        to: ChainObject,
        id: ChainObject,
        memo?: Memo,
        fee?: Fee,
    ): Observable<NftTransferOperation> {
        return of(new NftTransferOperation(from, to, id, memo, fee));
    }

    /**
     * Transfer NFT data instance
     *
     * @param credentials NFT data instance owner credentials
     * @param to receiver account object id
     * @param id NFT data instance object id
     * @param memo optional message
     * @param fee [Fee] fee for the operation, by default the fee will be computed in DCT asset.
     * When set to other then DCT, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public transfer(
        credentials: Credentials,
        to: ChainObject,
        id: ChainObject,
        memo?: Memo,
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createTransferOperation(credentials.account, to, id, memo, fee).pipe(
            flatMap((it) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [it])),
        );
    }

    /**
     * Create NFT data instance update operation
     *
     * @param modifier NFT data instance owner account object id, updatable values are set in [NftUpdateDataOperation.data] map
     * @param id NFT data instance object id
     * @param fee [Fee] fee for the operation, by default the fee will be computed in DCT asset.
     * When set to other then DCT, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public createUpdateDataOperation(
        modifier: ChainObject,
        id: ChainObject,
        fee?: Fee,
    ): Observable<NftUpdateDataOperation> {
        return this.getDataRaw(id).pipe(
            flatMap((nftData) => this.get(nftData.nftId).pipe(
                map((nft) => {
                    const update = nft.createUpdate(nftData.data);
                    assertThrow(update.size > 0, () => "no values to update");
                    return new NftUpdateDataOperation(modifier, id, update, fee);
                }))),
        );
    }

    /**
     * Update NFT data instance
     *
     * @param credentials NFT data instance credentials
     * @param id NFT data instance object id
     * @param values map of field name to value which should be updated
     * @param fee [Fee] fee for the operation, by default the fee will be computed in DCT asset.
     * When set to other then DCT, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public updateData(
        credentials: Credentials,
        id: ChainObject,
        values: Map<string, any>,
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createUpdateDataOperation(credentials.account, id, fee).pipe(
            tap((it) => values.forEach((value, key) => it.data.set(key, value))),
            flatMap((it) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [it])),
        );
    }

    private getId(nft: NftRef): Observable<ChainObject> {
        if (typeof nft === "string") {
            return this.get(nft).pipe(map((it) => it.id));
        } else {
            return of(nft);
        }
    }
}
