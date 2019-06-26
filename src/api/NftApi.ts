import { Observable, of } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { Credentials } from "../crypto/Credentials";
import { DCoreApi } from "../DCoreApi";
import { Fee, NftRef } from "../DCoreSdk";
import { ChainObject } from "../models/ChainObject";
import { Nft } from "../models/Nft";
import { NftData } from "../models/NftData";
import { NftDataType } from "../models/NftDataType";
import { NftOptions } from "../models/NftOptions";
import { NftCreateOperation } from "../models/operation/NftCreateOperation";
import { TransactionConfirmation } from "../models/TransactionConfirmation";
import { GetNftBalances } from "../net/models/request/GetNftBalances";
import { GetNftCount } from "../net/models/request/GetNftCount";
import { GetNftData } from "../net/models/request/GetNftData";
import { GetNftDataCount } from "../net/models/request/GetNftDataCount";
import { GetNfts } from "../net/models/request/GetNfts";
import { GetNftsBySymbol } from "../net/models/request/GetNftsBySymbol";
import { ListNftData } from "../net/models/request/ListNftData";
import { ListNfts } from "../net/models/request/ListNfts";
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
    public getNftBalancesRaw(account: ChainObject, nftIds: ChainObject[]): Observable<NftData[]> {
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

}
