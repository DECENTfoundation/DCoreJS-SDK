import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { Asset } from "../models/Asset";
import { AssetAmount } from "../models/AssetAmount";
import { ChainObject } from "../models/ChainObject";
import { BaseOperation } from "../models/operation/BaseOperation";
import { GetAssets } from "../net/models/request/GetAssets";
import { GetRequiredFees } from "../net/models/request/GetRequiredFees";
import { LookupAssetSymbols } from "../net/models/request/LookupAssetSymbols";
import { BaseApi } from "./BaseApi";

export class AssetApi extends BaseApi {

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * get assets by id
     *
     * @param assetIds asset id eg. DCT id is 1.3.0
     *
     * @return list of assets or empty
     */
    public getAssets(assetIds: ChainObject[]): Observable<Asset[]> {
        return this.request(new GetAssets(assetIds));
    }

    /**
     * lookup assets by symbol
     *
     * @param assetSymbols asset symbols eg. DCT
     *
     * @return list of assets or empty
     */
    public lookupAssets(assetSymbols: string[]): Observable<Asset[]> {
        return this.request(new LookupAssetSymbols(assetSymbols));
    }

    /**
     * Returns fees for operation
     *
     * @param op list of operations
     *
     * @return a list of fee asset amounts
     */
    public getFees(op: BaseOperation[]): Observable<AssetAmount[]> {
        return this.request(new GetRequiredFees(op));
    }
}
