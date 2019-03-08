import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DCoreApi } from "../DCoreApi";
import { Asset } from "../models/Asset";
import { AssetAmount } from "../models/AssetAmount";
import { ChainObject } from "../models/ChainObject";
import { RealSupply } from "../models/RealSupply";
import { GetAssets } from "../net/models/request/GetAssets";
import { GetRealSupply } from "../net/models/request/GetRealSupply";
import { ListAssets } from "../net/models/request/ListAssets";
import { LookupAssetSymbols } from "../net/models/request/LookupAssetSymbols";
import { PriceToDct } from "../net/models/request/PriceToDct";
import { BaseApi } from "./BaseApi";

export class AssetApi extends BaseApi {

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Get asset by id.
     *
     * @param assetId asset id eg. DCT id is 1.3.0
     *
     * @return asset or {@link ObjectNotFoundError}
     */
    public get(assetId: ChainObject): Observable<Asset> {
        return this.getAll([assetId]).pipe(map((list) => list[0]));
    }

    /**
     * Get assets by id.
     *
     * @param assetIds asset id eg. DCT id is 1.3.0
     *
     * @return list of assets or {@link ObjectNotFoundError}
     */
    public getAll(assetIds: ChainObject[]): Observable<Asset[]> {
        return this.request(new GetAssets(assetIds));
    }

    /**
     * Return current core asset supply.
     *
     * @return current supply
     */
    public getRealSupply(): Observable<RealSupply> {
        return this.api.request(new GetRealSupply());
    }

    /**
     * Get assets alphabetically by symbol name.
     *
     * @param lowerBound lower bound of symbol names to retrieve
     * @param limit maximum number of assets to fetch (must not exceed 100)
     *
     * @return the assets found
     */
    public listAllRelative(lowerBound: string, limit: number = 100): Observable<Asset[]> {
        return this.api.request(new ListAssets(lowerBound, limit));
    }

    /**
     * Get asset by symbol
     *
     * @param assetSymbol asset symbol eg. DCT
     *
     * @return asset or {@link ObjectNotFoundError}
     */
    public getByName(assetSymbol: string): Observable<Asset> {
        return this.getAllByName([assetSymbol]).pipe(map((list) => list[0]));
    }

    /**
     * Get assets by symbol
     *
     * @param assetSymbols asset symbols eg. DCT
     *
     * @return list of assets or {@link ObjectNotFoundError}
     */
    public getAllByName(assetSymbols: string[]): Observable<Asset[]> {
        return this.request(new LookupAssetSymbols(assetSymbols));
    }

    /**
     * Converts asset into DCT, using actual price feed.
     *
     * @param amount some amount
     *
     * @return price in DCT
     */
    public convertToDct(amount: AssetAmount): Observable<AssetAmount> {
        return this.api.request(new PriceToDct(amount));
    }
}
