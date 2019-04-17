import { Decimal } from "decimal.js";
import * as _ from "lodash";
import * as Long from "long";
import { Observable } from "rxjs";
import { scalar } from "rxjs/internal/observable/scalar";
import { flatMap, map } from "rxjs/operators";
import { Credentials } from "../crypto/Credentials";
import { DCoreApi } from "../DCoreApi";
import { Asset } from "../models/Asset";
import { AssetAmount } from "../models/AssetAmount";
import { AssetData } from "../models/AssetData";
import { AssetOptions } from "../models/AssetOptions";
import { ChainObject } from "../models/ChainObject";
import { ExchangeRate } from "../models/ExchangeRate";
import { MonitoredAssetOpts } from "../models/MonitoredAssetOpts";
import { AssetCreateOperation } from "../models/operation/AssetCreateOperation";
import { AssetUpdateAdvancedOperation } from "../models/operation/AssetUpdateAdvancedOperation";
import { AssetUpdateOperation } from "../models/operation/AssetUpdateOperation";
import { RealSupply } from "../models/RealSupply";
import { TransactionConfirmation } from "../models/TransactionConfirmation";
import { GetAssetData } from "../net/models/request/GetAssetData";
import { GetAssets } from "../net/models/request/GetAssets";
import { GetRealSupply } from "../net/models/request/GetRealSupply";
import { ListAssets } from "../net/models/request/ListAssets";
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

    public listAll(includeMonitored: boolean = false): Observable<Asset[]> {
        return includeMonitored ? this.pageAll("") : this.pageAll("")
            .pipe(map((assets) => assets.filter((asset) => _.isNil(asset.monitoredAssetOpts))));
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
     * Get asset dynamic data by id.
     *
     * @param assetIds asset data id eg. DCT id is 2.3.0
     *
     * @return asset dynamic data or {@link ObjectNotFoundError}
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
        return this.get(assetId).pipe(
            map((asset: Asset) => asset.convertFromDCT(amount, roundingMode)),
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
        return this.get(assetId).pipe(
            map((asset: Asset) => asset.convertToDCT(amount, roundingMode)),
        );
    }

    public createAssetCreateOperation(
        issuer: ChainObject,
        symbol: string,
        precision: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
        description: string,
        options: AssetOptions,
        monitoredOptions?: MonitoredAssetOpts,
        fee?: AssetAmount | ChainObject,
    ): Observable<AssetCreateOperation> {
        return scalar(new AssetCreateOperation(issuer, symbol, precision, description, options, monitoredOptions, fee));
    }

    public createAsset(
        credentials: Credentials,
        symbol: string,
        precision: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
        description: string,
        options: AssetOptions = new AssetOptions(ExchangeRate.forCreateOp(1, 1)),
        fee?: AssetAmount | ChainObject,
    ): Observable<TransactionConfirmation> {
        return this.createAssetCreateOperation(
            credentials.account, symbol, precision, description, options, undefined, fee,
        ).pipe(flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])));
    }

    public createMonitoredAsset(
        credentials: Credentials,
        symbol: string,
        precision: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
        description: string,
        options: MonitoredAssetOpts = new MonitoredAssetOpts(),
        fee?: AssetAmount | ChainObject,
    ): Observable<TransactionConfirmation> {
        return this.createAssetCreateOperation(
            credentials.account, symbol, precision, description, new AssetOptions(ExchangeRate.empty(), 0), options, fee,
        ).pipe(flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])));
    }

    public createAssetUpdateOperation(
        issuer: ChainObject,
        assetId: ChainObject,
        coreExchangeRate?: ExchangeRate,
        newDescription?: string,
        exchangeable?: boolean,
        maxSupply?: number,
        newIssuer?: ChainObject,
        fee?: AssetAmount | ChainObject,
    ): Observable<AssetUpdateOperation> {
        return this.get(assetId).pipe(
            map((asset) => AssetUpdateOperation.create(asset)),
            map((op) => {
                op.newDescription = newDescription ? newDescription : op.newDescription;
                op.newIssuer = newIssuer ? newIssuer : op.newIssuer;
                op.maxSupply = maxSupply ? maxSupply : op.maxSupply;
                op.coreExchangeRate = coreExchangeRate ? coreExchangeRate : op.coreExchangeRate;
                op.exchangeable = exchangeable ? exchangeable : op.exchangeable;
                op.setFee(fee);
                return op;
            }),
        );
    }

    public updateAsset(
        credentials: Credentials,
        assetId: ChainObject,
        coreExchangeRate?: ExchangeRate,
        newDescription?: string,
        exchangeable?: boolean,
        maxSupply?: number,
        newIssuer?: ChainObject,
        fee?: AssetAmount | ChainObject,
    ): Observable<TransactionConfirmation> {
        return this.createAssetUpdateOperation(credentials.account, assetId, coreExchangeRate, newDescription, exchangeable, maxSupply, newIssuer, fee).pipe(
            flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])),
        );
    }

    public createAssetUpdateAdvancedOperation(
        issuer: ChainObject,
        assetId: ChainObject,
        precision?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
        fixedMaxSupply?: boolean,
        fee?: AssetAmount | ChainObject,
    ): Observable<AssetUpdateAdvancedOperation> {
        return this.get(assetId).pipe(
            map((asset) => AssetUpdateAdvancedOperation.create(asset)),
            map((op) => {
                op.precision = precision ? precision : op.precision;
                op.fixedMaxSupply = fixedMaxSupply ? fixedMaxSupply : op.fixedMaxSupply;
                op.setFee(fee);
                return op;
            }),
        );
    }

    /**
     *
     * @param credentials
     * @param assetId
     * @param precision
     * @param fixedMaxSupply irreversible
     * @param fee
     */
    public updateAdvancedAsset(
        credentials: Credentials,
        assetId: ChainObject,
        precision?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
        fixedMaxSupply?: boolean,
        fee?: AssetAmount | ChainObject,
    ): Observable<TransactionConfirmation> {
        return this.createAssetUpdateAdvancedOperation(credentials.account, assetId, precision, fixedMaxSupply, fee).pipe(
            flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])),
        );
    }

    private pageAll(lowerBound: string): Observable<Asset[]> {
        const limit = 100;
        return this.listAllRelative(lowerBound, limit).pipe(
            flatMap((prev) => {
                if (prev.length < limit) {
                    return scalar(prev);
                } else {
                    return this.pageAll(_.last(prev)!.symbol)
                        .pipe(map((next) => _.concat(prev, _.drop(next, 1))));
                }
            }));
    }
}
