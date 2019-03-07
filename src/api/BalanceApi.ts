import { Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { DCoreApi } from "../DCoreApi";
import { DCoreConstants } from "../DCoreConstants";
import { AccountRef, AssetWithAmount } from "../DCoreSdk";
import { Asset } from "../models/Asset";
import { AssetAmount } from "../models/AssetAmount";
import { ChainObject } from "../models/ChainObject";
import { VestingBalance } from "../models/VestingBalance";
import { GetAccountBalances } from "../net/models/request/GetAccountBalances";
import { GetNamedAccountBalances } from "../net/models/request/GetNamedAccountBalances";
import { GetVestingBalances } from "../net/models/request/GetVestingBalances";
import { BaseApi } from "./BaseApi";

export class BalanceApi extends BaseApi {

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Get account balance.
     *
     * @param account account name or account object id, 1.2.*
     * @param asset object id of the assets, 1.3.*
     *
     * @return amount for asset
     */
    public get(account: AccountRef, asset: ChainObject): Observable<AssetAmount> {
        return this.getAll(account, [asset]).pipe(map((list) => list[0]));
    }

    /**
     * Get account balances.
     *
     * @param account account name or account object id, 1.2.*
     * @param assets object ids of the assets, 1.3.*
     *
     * @return list of amounts for different assets
     */
    public getAll(account: AccountRef, assets?: ChainObject[]): Observable<AssetAmount[]> {
        return this.getBalanceInternal(account, assets);
    }

    /**
     * Get account balance with asset.
     *
     * @param account account name or account object id, 1.2.*
     * @param assetSymbol asset symbol, eg. DCT
     *
     * @return a pair of asset to amount
     */
    public getWithAsset(account: AccountRef, assetSymbol: string = DCoreConstants.DCT_ASSET_SYMBOL): Observable<AssetWithAmount> {
        return this.getAllWithAsset(account, [assetSymbol]).pipe(map((list) => list[0]));
    }

    /**
     * Get account balance with asset.
     *
     * @param account account name or account object id, 1.2.*
     * @param assetSymbols asset symbols, eg. DCT
     *
     * @return a list of pairs of assets to amounts
     */
    public getAllWithAsset(account: AccountRef, assetSymbols: string[]): Observable<AssetWithAmount[]> {
        return this.api.assetApi.getAllByName(assetSymbols)
            .pipe(flatMap((assets) => this.getAll(account, assets.map((asset) => asset.id))
                .pipe(map((balances) => this.createTuple(assets, balances))),
            ));
    }

    /**
     * Get information about a vesting balance object.
     *
     * @param accountId id of the account
     *
     * @return a list of vesting balances with additional information
     */
    public getAllVesting(accountId: ChainObject): Observable<VestingBalance[]> {
        return this.api.request(new GetVestingBalances(accountId));
    }

    private createTuple(assets: Asset[], balances: AssetAmount[]): AssetWithAmount[] {
        return assets.map((asset) => [asset, balances.find((balance) => balance.assetId.eq(asset.id))] as AssetWithAmount);
    }

    private getBalanceInternal(account: AccountRef, assets?: ChainObject[]): Observable<AssetAmount[]> {
        if (typeof account === "string" && ChainObject.isValid(account)) {
            return this.getBalanceInternal(ChainObject.parse(account), assets);
        } else if (typeof account === "string") {
            return this.request(new GetNamedAccountBalances(account, assets));
        } else {
            return this.request(new GetAccountBalances(account, assets));
        }
    }
}
