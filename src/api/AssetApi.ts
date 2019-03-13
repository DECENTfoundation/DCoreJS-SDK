import { Decimal } from "decimal.js";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DCoreApi } from "../DCoreApi";
import { Asset } from "../models/Asset";
import { AssetAmount } from "../models/AssetAmount";
import { AssetData } from "../models/AssetData";
import { ChainObject } from "../models/ChainObject";
import { BaseOperation } from "../models/operation/BaseOperation";
import { GetAssetData } from "../net/models/request/GetAssetData";
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
     * @param assetId asset id to use for a fee if possible, eg. DCT id is 1.3.0
     *
     * @return a list of fee asset amounts in specified asset or DCT if not applicable
     */
    public getFees(op: BaseOperation[], assetId: ChainObject): Observable<AssetAmount[]> {
        return this.request(new GetRequiredFees(op, assetId));
    }

    /**
     * Get asset dynamic data by id.
     *
     * @param assetIds asset data id eg. DCT id is 2.3.0
     *
     * @return asset dynamic data or {@link NotFoundError}
     */
    public getAssetsData(assetIds: ChainObject[]): Observable<AssetData[]> {
        return this.request(new GetAssetData(assetIds));
    }

    /**
     * Get asset by id and convert amount in DCT to this asset
     *
     * @param assetId asset id to get
     * @param amount amount to convert
     * @param roundingMode rounding mode to use when rounding to target asset precision
     */
    public convertFromDCT(assetId: ChainObject, amount: number | Long, roundingMode: Decimal.Rounding = Decimal.ROUND_CEIL): Observable<AssetAmount> {
        return this.getAssets([assetId]).pipe(
            map((asset: Asset[]) => asset[0].convertFromDCT(amount, roundingMode)),
        );
    }

    /**
     * Get asset by id and convert amount in this asset to DCT
     *
     * @param assetId asset id to get
     * @param amount amount to convert
     * @param roundingMode rounding mode to use when rounding to target asset precision
     */
    public convertToDCT(assetId: ChainObject, amount: number | Long, roundingMode: Decimal.Rounding = Decimal.ROUND_CEIL): Observable<AssetAmount> {
        return this.getAssets([assetId]).pipe(
            map((asset: Asset[]) => asset[0].convertToDCT(amount, roundingMode)),
        );
    }

}
