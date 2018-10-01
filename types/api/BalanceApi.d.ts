import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { AccountRef, AssetWithAmount, DCoreSdk } from "../DCoreSdk";
import { AssetAmount } from "../models/AssetAmount";
import { ChainObject } from "../models/ChainObject";
export declare class BalanceApi {
    private core;
    private api;
    constructor(core: DCoreSdk, api: DCoreApi);
    /**
     * get account balance
     *
     * @param account account name, or object id of the account (1.2.*) or account public key
     * @param assets symbols of the asset eg. DCT
     * @return list of amounts for different assets
     */
    getBalance(account: AccountRef, assets?: string[]): Observable<AssetWithAmount[]>;
    /**
     * get account balance
     *
     * @param account account name, or object id of the account (1.2.*) or account public key
     * @param assets object ids of the asset (1.3.*)
     * @return list of amounts for different assets
     */
    getBalance(account: AccountRef, assets?: ChainObject[]): Observable<AssetAmount[]>;
    private createTuple;
    private getBalanceInternal;
}
