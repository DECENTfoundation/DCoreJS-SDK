import * as _ from "lodash";
import { Observable } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { Address } from "../crypto/Address";
import { DCoreApi } from "../DCoreApi";
import { AccountRef, AssetWithAmount } from "../DCoreSdk";
import { Asset } from "../models/Asset";
import { AssetAmount } from "../models/AssetAmount";
import { ChainObject } from "../models/ChainObject";
import { GetAccountBalances } from "../net/models/request/GetAccountBalances";
import { GetAccountBalancesByName } from "../net/models/request/GetAccountBalancesByName";
import { ObjectCheckOf } from "../utils/ObjectCheckOf";
import { BaseApi } from "./BaseApi";

export class BalanceApi extends BaseApi {

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * get account balance
     *
     * @param account account name, or object id of the account (1.2.*) or account public key
     * @param assets symbols of the asset eg. DCT
     * @return list of amounts for different assets
     */
    public getBalance(account: AccountRef, assets?: string[]): Observable<AssetWithAmount[]>;

    /**
     * get account balance
     *
     * @param account account name, or object id of the account (1.2.*) or account public key
     * @param assets object ids of the asset (1.3.*)
     * @return list of amounts for different assets
     */
    public getBalance(account: AccountRef, assets?: ChainObject[]): Observable<AssetAmount[]>;
    public getBalance(account: AccountRef, assets?: string[] | ChainObject[]): Observable<AssetAmount[]> | Observable<AssetWithAmount[]> {
        let balance: (ids?: ChainObject[]) => Observable<AssetAmount[]>;
        if (ObjectCheckOf<Address>(account, "publicKey")) {
            balance = (ids) => this.api.accountApi.getAccountIdsByKey([account]).pipe(
                map((list) => list[0][0]),
                concatMap((accountId) => this.getBalanceInternal(accountId, ids)),
            );
        } else {
            balance = (ids) => this.getBalanceInternal(account, ids);
        }

        if (!_.isNil(assets) && assets.length > 0 && typeof assets[0] === "string") {
            return this.api.assetApi.lookupAssets(assets as string[])
                .pipe(concatMap((assetList) =>
                    balance(assetList.map((asset) => asset.id)).pipe(map((balances) => this.createTuple(assetList, balances))),
                ));
        } else {
            return balance(assets as ChainObject[]);
        }
    }

    private createTuple(assets: Asset[], balances: AssetAmount[]): AssetWithAmount[] {
        return assets.map((asset) => [asset, balances.find((amount) => amount.assetId.eq(asset.id)).amount] as AssetWithAmount);
    }

    private getBalanceInternal(account: ChainObject | string, assets?: ChainObject[]): Observable<AssetAmount[]> {
        if (typeof account === "string") {
            return this.request(new GetAccountBalancesByName(account, assets));
        } else {
            return this.request(new GetAccountBalances(account, assets));
        }
    }
}
