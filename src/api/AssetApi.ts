import { Observable } from "rxjs";
import { DCoreSdk } from "../DCoreSdk";
import { Asset } from "../models/Asset";
import { AssetAmount } from "../models/AssetAmount";
import { ChainObject } from "../models/ChainObject";
import { BaseOperation } from "../models/operation/BaseOperation";
import { GetAssets } from "../net/models/request/GetAssets";
import { GetRequiredFees } from "../net/models/request/GetRequiredFees";
import { LookupAssetSymbols } from "../net/models/request/LookupAssetSymbols";

export class AssetApi {

    constructor(private core: DCoreSdk) {
    }

    /**
     * get assets by id
     *
     * @param assetIds asset id eg. DCT id is 1.3.0
     *
     * @return list of assets or empty
     */
    public getAssets(assetIds: ChainObject[]): Observable<Asset[]> {
        return this.core.request(new GetAssets(assetIds));
    }

    /**
     * lookup assets by symbol
     *
     * @param assetSymbols asset symbols eg. DCT
     *
     * @return list of assets or empty
     */
    public lookupAssets(assetSymbols: string[]): Observable<Asset[]> {
        return this.core.request(new LookupAssetSymbols(assetSymbols));
    }

    /**
     * Returns fees for operation
     *
     * @param op list of operations
     *
     * @return a list of fee asset amounts
     */
    public getFees(op: BaseOperation[]): Observable<AssetAmount[]> {
        return this.core.request(new GetRequiredFees(op));
    }
}
