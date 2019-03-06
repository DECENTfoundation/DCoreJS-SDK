import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DCoreApi } from "../DCoreApi";
import { Asset } from "../models/Asset";
import { ChainObject } from "../models/ChainObject";
import { GetAssets } from "../net/models/request/GetAssets";
import { LookupAssetSymbols } from "../net/models/request/LookupAssetSymbols";
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
}
