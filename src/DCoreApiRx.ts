import isNil = require("lodash/fp/isNil");
import { Observable } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { Account } from "./models/Account";
import { Asset } from "./models/Asset";
import { AssetAmount } from "./models/AssetAmount";
import { ChainObject } from "./models/ChainObject";
import { Content } from "./models/Content";
import { Purchase } from "./models/Purchase";
import { TransactionDetail } from "./models/TransactionDetail";

export abstract class DCoreApiRx {

    /**
     * get account balance
     *
     * @param account account name or object id of the account, 1.2.*
     * @param symbol symbol of the asset eg. DCT
     * @return list of amounts for different assets
     */
    public getBalance(account: ChainObject | string): Observable<AssetAmount[]>;
    public getBalance(account: ChainObject | string, symbol: string): Observable<number>;
    public getBalance(account: ChainObject | string, symbol?: string): Observable<AssetAmount[]> | Observable<number> {
        const balance = typeof account === "string"
            ? this.getAccountByName(account).pipe(concatMap((acc) => this.getBalanceInternal(acc.id)))
            : this.getBalanceInternal(account);

        if (!isNil(symbol)) {
            this.lookupAssets([symbol]).pipe(
                map((list) => list[0]),
                concatMap((asset) => balance.pipe(
                    map((balances) => {
                        const found = balances.find((amount) => amount.assetId === asset.id);
                        return isNil(balance) ? 0 : found.amount;
                    })),
                ),
            );
        } else {
            return balance;
        }
    }

    /**
     * get assets by id
     *
     * @param assetIds asset id eg. DCT id is 1.3.0
     *
     * @return list of assets or empty
     */
    public abstract getAssets(assetIds: ChainObject[]): Observable<Asset[]>;

    /**
     * lookup assets by symbol
     *
     * @param assetSymbols asset symbols eg. DCT
     *
     * @return list of assets or empty
     */
    public abstract lookupAssets(assetSymbols: string[]): Observable<Asset[]>;

    /**
     * get Account object by name
     *
     * @param name the name of the account
     * @return an account if found, [ch.decent.sdk.exception.ObjectNotFoundException] otherwise
     */
    public abstract getAccountByName(name: string): Observable<Account>;

    /**
     * get Account object by id
     *
     * @param accountId object id of the account, 1.2.*
     * @return an account if found, [ch.decent.sdk.exception.ObjectNotFoundException] otherwise
     */
    public abstract getAccountById(accountId: ChainObject): Observable<Account>;

    /**
     * search account history
     *
     * @param accountId object id of the account, 1.2.*
     * @param order
     * @param from object id of the history object to start from, use 0.0.0 to ignore
     * @param limit number of entries, max 100
     */
    public abstract searchAccountHistory(
        accountId: ChainObject,
        // order: SearchAccountHistoryOrder = SearchAccountHistoryOrder.TIME_DESC,
        // from: ChainObject = ChainObject.NONE,
        // limit: Int = 100
        order: SearchAccountHistoryOrder,
        from: ChainObject,
        limit: number,
    ): Observable<TransactionDetail[]>;

    /**
     * search consumer open and history purchases
     *
     * @param consumer object id of the account, 1.2.*
     * @param order
     * @param from object id of the history object to start from, use 0.0.0 to ignore
     * @param term search term
     * @param limit number of entries, max 100
     */
    public abstract searchPurchases(
        consumer: ChainObject,
        // order: SearchPurchasesOrder = SearchPurchasesOrder.PURCHASED_DESC,
        // from: ChainObject = ChainObject.NONE,
        // term: String = "",
        // limit: Int = 100
        order: SearchPurchasesOrder,
        from: ChainObject,
        term: string,
        limit: number,
    ): Observable<Purchase[]>;

    /**
     * get consumer buying by content uri
     *
     * @param consumer object id of the account, 1.2.*
     * @param uri a uri of the content
     *
     * @return an account if found, [ch.decent.sdk.exception.ObjectNotFoundException] otherwise
     */
    public abstract getPurchase(
        consumer: ChainObject,
        uri: string,
    ): Observable<Purchase>;

    /**
     * get content by id
     *
     * @param contentId object id of the content, 2.13.*
     *
     * @return a content if found, [ch.decent.sdk.exception.ObjectNotFoundException] otherwise
     */
    public abstract getContent(contentId: ChainObject): Observable<Content>;

    protected abstract getContentInternal(contentId: ChainObject): Observable<Content>;

    protected abstract getBalanceInternal(account: ChainObject): Observable<AssetAmount[]>;
}
