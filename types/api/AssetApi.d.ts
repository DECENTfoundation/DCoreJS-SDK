import { Observable } from "rxjs";
import { DCoreSdk } from "../DCoreSdk";
import { Asset } from "../models/Asset";
import { AssetAmount } from "../models/AssetAmount";
import { ChainObject } from "../models/ChainObject";
import { BaseOperation } from "../models/operation/BaseOperation";
export declare class AssetApi {
    private core;
    constructor(core: DCoreSdk);
    /**
     * get assets by id
     *
     * @param assetIds asset id eg. DCT id is 1.3.0
     *
     * @return list of assets or empty
     */
    getAssets(assetIds: ChainObject[]): Observable<Asset[]>;
    /**
     * lookup assets by symbol
     *
     * @param assetSymbols asset symbols eg. DCT
     *
     * @return list of assets or empty
     */
    lookupAssets(assetSymbols: string[]): Observable<Asset[]>;
    /**
     * Returns fees for operation
     *
     * @param op list of operations
     *
     * @return a list of fee asset amounts
     */
    getFees(op: BaseOperation[]): Observable<AssetAmount[]>;
}
