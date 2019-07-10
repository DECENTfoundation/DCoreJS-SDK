import { Decimal } from "decimal.js";
import * as _ from "lodash";
import * as Long from "long";
import { Observable, of, throwError } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { Credentials } from "../crypto/Credentials";
import { DCoreApi } from "../DCoreApi";
import { AssetPrecision, AssetRef, Fee } from "../DCoreSdk";
import { Asset } from "../models/Asset";
import { AssetAmount } from "../models/AssetAmount";
import { AssetData } from "../models/AssetData";
import { AssetOptions } from "../models/AssetOptions";
import { ChainObject } from "../models/ChainObject";
import { IllegalArgumentError } from "../models/error/IllegalArgumentError";
import { ExchangeRate } from "../models/ExchangeRate";
import { Memo } from "../models/Memo";
import { MonitoredAssetOpts } from "../models/MonitoredAssetOpts";
import { AssetClaimFeesOperation } from "../models/operation/AssetClaimFeesOperation";
import { AssetCreateOperation } from "../models/operation/AssetCreateOperation";
import { AssetFundPoolsOperation } from "../models/operation/AssetFundPoolsOperation";
import { AssetIssueOperation } from "../models/operation/AssetIssueOperation";
import { AssetReserveOperation } from "../models/operation/AssetReserveOperation";
import { AssetUpdateAdvancedOperation } from "../models/operation/AssetUpdateAdvancedOperation";
import { AssetUpdateOperation } from "../models/operation/AssetUpdateOperation";
import { RealSupply } from "../models/RealSupply";
import { TransactionConfirmation } from "../models/TransactionConfirmation";
import { GetAssetData } from "../net/models/request/GetAssetData";
import { GetAssets } from "../net/models/request/GetAssets";
import { GetRealSupply } from "../net/models/request/GetRealSupply";
import { ListAssets } from "../net/models/request/ListAssets";
import { LookupAssetSymbols } from "../net/models/request/LookupAssetSymbols";
import { ObjectCheckOf } from "../utils/ObjectCheckOf";
import { BaseApi } from "./BaseApi";

export class AssetApi extends BaseApi {

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Get asset by id or symbol.
     *
     * @param asset asset id eg. DCT or id 1.3.0
     *
     * @return asset or {@link ObjectNotFoundError}
     */
    public get(asset: AssetRef): Observable<Asset> {
        if (typeof asset === "string") {
            if (ChainObject.isValid(asset)) {
                return this.get(ChainObject.parse(asset));
            }
            if (Asset.isValidSymbol(asset)) {
                return this.getByName(asset);
            }
        }
        if (ObjectCheckOf<ChainObject>(asset, "instance")) {
            return this.getAll([asset]).pipe(map((list) => list[0]));
        }
        return throwError(new IllegalArgumentError("not a valid asset symbol or id"));
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

    /**
     * Create asset create operation.
     *
     * @param issuer account id issuing the asset
     * @param symbol the string symbol, 3-16 uppercase chars
     * @param precision base unit precision, decimal places used in string representation
     * @param description optional description
     * @param options asset options
     * @param monitoredOptions options for monitored asset
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public createAssetCreateOperation(
        issuer: ChainObject,
        symbol: string,
        precision: AssetPrecision,
        description: string,
        options: AssetOptions,
        monitoredOptions?: MonitoredAssetOpts,
        fee?: Fee,
    ): Observable<AssetCreateOperation> {
        return of(new AssetCreateOperation(issuer, symbol, precision, description, options, monitoredOptions, fee));
    }

    /**
     * Create a new Asset.
     *
     * @param credentials account credentials issuing the asset
     * @param symbol the string symbol, 3-16 uppercase chars
     * @param precision base unit precision, decimal places used in string representation
     * @param description optional description
     * @param options asset options
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public create(
        credentials: Credentials,
        symbol: string,
        precision: AssetPrecision,
        description: string,
        options: AssetOptions = new AssetOptions(ExchangeRate.forCreateOp(1, 1)),
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createAssetCreateOperation(
            credentials.account, symbol, precision, description, options, undefined, fee,
        ).pipe(flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])));
    }

    /**
     * cannot create
     * asset_create_op has account_id_type fee_payer()const { return monitored_asset_opts.valid() ? account_id_type() : issuer; }
     * therefore throws Missing Active Authority 1.2.0
     */
    public createMonitoredAsset(
        credentials: Credentials,
        symbol: string,
        precision: AssetPrecision,
        description: string,
        options: MonitoredAssetOpts = new MonitoredAssetOpts(),
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createAssetCreateOperation(
            credentials.account, symbol, precision, description, new AssetOptions(ExchangeRate.empty(), Long.fromValue(0)), options, fee,
        ).pipe(flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])));
    }

    /**
     * Create update asset operation.
     *
     * @param asset asset to update
     * @param exchangeRate new exchange rate
     * @param description new description
     * @param exchangeable enable converting the asset to DCT, so it can be used to pay for fees
     * @param maxSupply new max supply
     * @param newIssuer a new issuer account id
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public createAssetUpdateOperation(
        asset: AssetRef,
        newIssuer?: ChainObject,
        fee?: Fee,
    ): Observable<AssetUpdateOperation> {
        return this.get(asset).pipe(
            map((obj) => new AssetUpdateOperation(
                obj.issuer,
                obj.id,
                obj.options.exchangeRate,
                obj.description,
                obj.options.exchangeable,
                obj.options.maxSupply,
                newIssuer,
                fee,
            )),
        );
    }

    /**
     * Update asset.
     *
     * @param credentials account credentials issuing the asset
     * @param asset asset to update
     * @param exchangeRate new exchange rate, DCT base amount to UIA quote amount pair
     * @param description new description
     * @param exchangeable enable converting the asset to DCT, so it can be used to pay for fees
     * @param maxSupply new max supply
     * @param newIssuer a new issuer account id
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public update(
        credentials: Credentials,
        asset: AssetRef,
        exchangeRate?: [Long | number, Long | number],
        description?: string,
        exchangeable?: boolean,
        maxSupply?: Long,
        newIssuer?: ChainObject,
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createAssetUpdateOperation(asset, newIssuer, fee).pipe(
            map((it) => {
                it.coreExchangeRate = exchangeRate ? ExchangeRate.forUpdateOp(exchangeRate[0], exchangeRate[1], it.assetToUpdate) : it.coreExchangeRate;
                it.newDescription = description ? description : it.newDescription;
                it.exchangeable = exchangeable ? exchangeable : it.exchangeable;
                it.maxSupply = maxSupply ? maxSupply : it.maxSupply;
                return it;
            }),
            flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])),
        );
    }

    /**
     * Create update advanced options operation for the asset.
     *
     * @param asset asset to update
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public createAssetUpdateAdvancedOperation(
        asset: AssetRef,
        fee?: Fee,
    ): Observable<AssetUpdateAdvancedOperation> {
        return this.get(asset).pipe(
            map((obj) => AssetUpdateAdvancedOperation.create(obj)),
            map((op) => {
                op.setFee(fee);
                return op;
            }),
        );
    }

    /**
     * Update advanced options for the asset.
     *
     * @param credentials account credentials issuing the asset
     * @param asset asset to update
     * @param precision new precision
     * @param fixedMaxSupply whether it should be allowed to change max supply, cannot be reverted once set to true
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public updateAdvanced(
        credentials: Credentials,
        asset: AssetRef,
        precision?: AssetPrecision,
        fixedMaxSupply?: boolean,
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createAssetUpdateAdvancedOperation(asset, fee).pipe(
            map((it) => {
                it.precision = precision ? precision : it.precision;
                it.fixedMaxSupply = fixedMaxSupply ? fixedMaxSupply : it.fixedMaxSupply;
                return it;
            }),
            flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])),
        );
    }

    /**
     * Create issue asset operation. Only the issuer of the asset can issue some funds until maxSupply is reached.
     *
     * @param asset asset to issue
     * @param amount raw amount to issue
     * @param to optional account id receiving the created funds, issuer account id is used if not defined
     * @param memo optional memo for receiver
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public createAssetIssueOperation(
        asset: AssetRef,
        amount: Long | number,
        to?: ChainObject,
        memo?: Memo,
        fee?: Fee,
    ): Observable<AssetIssueOperation> {
        return this.get(asset).pipe(
            map((obj) => new AssetIssueOperation(obj.issuer, new AssetAmount(amount, obj.id), to ? to : obj.issuer, memo, fee)),
        );
    }

    /**
     * Issue asset. Only the issuer of the asset can issue some funds until maxSupply is reached.
     *
     * @param credentials account credentials issuing the asset
     * @param asset asset to issue
     * @param amount raw amount to issue
     * @param to optional account id receiving the created funds, issuer account id is used if not defined
     * @param memo optional memo for receiver
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public issue(
        credentials: Credentials,
        asset: AssetRef,
        amount: Long | number,
        to?: ChainObject,
        memo?: Memo,
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createAssetIssueOperation(asset, amount, to, memo, fee).pipe(
            flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])),
        );
    }

    /**
     * Create fund asset pool operation. Any account can fund a pool.
     *
     * @param asset which asset to fund
     * @param uia UIA raw amount
     * @param dct DCT raw amount
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public createFundPoolsOperation(
        asset: AssetRef,
        uia: Long | number,
        dct: Long | number,
        fee?: Fee,
    ): Observable<AssetFundPoolsOperation> {
        return this.get(asset).pipe(map((obj) => new AssetFundPoolsOperation(obj.issuer, new AssetAmount(uia, obj.id), new AssetAmount(dct), fee)));
    }

    /**
     * Fund asset pool. Any account can fund a pool.
     *
     * @param credentials account credentials funding the pool
     * @param asset which asset to fund
     * @param uia UIA raw amount
     * @param dct DCT raw amount
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public fund(
        credentials: Credentials,
        asset: AssetRef,
        uia: Long | number,
        dct: Long | number,
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createFundPoolsOperation(asset, uia, dct, fee).pipe(
            flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])),
        );
    }

    /**
     * Create claim fees operation. Claim funds from asset pool, only the asset issuer can claim.
     *
     * @param asset which asset to claim from
     * @param uia UIA raw amount
     * @param dct DCT raw amount
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public createClaimFeesOperation(
        asset: AssetRef,
        uia: Long | number,
        dct: Long | number,
        fee?: Fee,
    ): Observable<AssetClaimFeesOperation> {
        return this.get(asset).pipe(map((obj) => new AssetClaimFeesOperation(obj.issuer, new AssetAmount(uia, obj.id), new AssetAmount(dct), fee)));
    }

    /**
     * Claim fees. Claim funds from asset pool, only the asset issuer can claim.
     *
     * @param credentials account credentials issuing the asset
     * @param asset which asset to claim from
     * @param uia UIA raw amount
     * @param dct DCT raw amount
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public claim(
        credentials: Credentials,
        asset: AssetRef,
        uia: Long | number,
        dct: Long | number,
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createClaimFeesOperation(asset, uia, dct, fee).pipe(
            flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])),
        );
    }

    /**
     * Create reserve funds operation. Return issued funds to the issuer of the asset.
     *
     * @param asset which asset to reserve from
     * @param amount raw amount to remove from current supply
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public createReserveOperation(
        asset: AssetRef,
        amount: Long | number,
        fee?: Fee,
    ): Observable<AssetReserveOperation> {
        return this.get(asset).pipe(map((obj) => new AssetReserveOperation(obj.issuer, new AssetAmount(amount, obj.id), fee)));
    }

    /**
     * Reserve funds. Return issued funds to the issuer of the asset.
     *
     * @param credentials account credentials returning the asset
     * @param asset which asset to reserve from
     * @param amount raw amount to remove from current supply
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    public reserve(
        credentials: Credentials,
        asset: AssetRef,
        amount: Long | number,
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createReserveOperation(asset, amount, fee).pipe(
            flatMap((op) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [op])),
        );
    }

    private pageAll(lowerBound: string): Observable<Asset[]> {
        const limit = 100;
        return this.listAllRelative(lowerBound, limit).pipe(
            flatMap((prev) => {
                if (prev.length < limit) {
                    return of(prev);
                } else {
                    return this.pageAll(_.last(prev)!.symbol)
                        .pipe(map((next) => _.concat(prev, _.drop(next, 1))));
                }
            }));
    }
}
