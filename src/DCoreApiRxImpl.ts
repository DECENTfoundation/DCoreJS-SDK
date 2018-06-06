import isNil = require("lodash/fp/isNil");
import { Observable } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { ECKeyPair } from "./crypto/ECKeyPair";
import { Account } from "./models/Account";
import { Asset } from "./models/Asset";
import { AssetAmount } from "./models/AssetAmount";
import { Authority } from "./models/Authority";
import { ChainObject } from "./models/ChainObject";
import { Content } from "./models/Content";
import { Miner } from "./models/Miner";
import { BaseOperation } from "./models/operation/BaseOperation";
import { OperationHistory } from "./models/OperationHistory";
import { Options } from "./models/Options";
import { ProcessedTransaction } from "./models/ProcessedTransaction";
import { Purchase } from "./models/Purchase";
import { TransactionConfirmation } from "./models/TransactionConfirmation";
import { TransactionDetail } from "./models/TransactionDetail";

export abstract class DCoreApiRxImpl {

    /**
     * get account balance
     *
     * @param accountRef account name or object id of the account, 1.2.*
     * @return list of amounts for different assets
     */
    public getBalance(accountRef: ChainObject | string): Observable<AssetAmount[]>;
    /**
     * get account balance
     *
     * @param accountRef account name or object id of the account, 1.2.*
     * @param symbol symbol of the asset eg. DCT
     * @return list of amounts for different assets
     */
    public getBalance(accountRef: ChainObject | string, symbol: string): Observable<number>;
    public getBalance(accountRef: ChainObject | string, symbol?: string): Observable<AssetAmount[]> | Observable<number> {
        const balance = typeof accountRef === "string"
            ? this.getAccountByName(accountRef).pipe(concatMap((acc) => this.getBalanceInternal(acc.id)))
            : this.getBalanceInternal(accountRef);

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
     * get content
     *
     * @param contentRef uri of the content or object id of the content, 2.13.*
     *
     * @return a content if found, [ch.decent.sdk.exception.ObjectNotFoundException] otherwise
     */
    public abstract getContent(contentRef: ChainObject | string): Observable<Content>;

    /**
     * get account history
     *
     * @param account object id of the account, 1.2.*
     * @param limit number of entries, max 100
     * @param startId id of the history object to start from, use 1.7.0 to ignore
     * @param stopId id of the history object to stop at, use 1.7.0 to ignore
     *
     * @return list of history operations
     */
    public getAccountHistory(
        account: ChainObject | string,
        limit: number = 100,
        startId: ChainObject = ChainObject.parse("1.7.0"),
        stopId: ChainObject = ChainObject.parse("1.7.0"),
    ): Observable<OperationHistory[]> {
        return (typeof account === "string")
            ? this.getAccountByName(account).pipe(concatMap((acc) => this.getAccountHistoryInternal(acc.id, 100, startId, stopId)))
            : this.getAccountHistoryInternal(account, limit, startId, stopId);
    }

    /**
     * If the transaction has not expired, this method will return the transaction for the given ID or it will return
     * [ch.decent.sdk.exception.ObjectNotFoundException]. Just because it is not known does not mean it wasn't included
     * in the blockchain. The ID can be retrieved from [Transaction] or [TransactionConfirmation] objects.
     * You can set up a custom expiration value in [DCoreSdk.transactionExpiration]
     *
     * @param trxId transaction id
     *
     * @return a transaction if found, [ch.decent.sdk.exception.ObjectNotFoundException] otherwise
     */
    public abstract getRecentTransaction(trxId: string): Observable<ProcessedTransaction>;

    /**
     * get applied transaction
     *
     * @param blockNum block number
     * @param trxInBlock position of the transaction in block
     *
     * @return a transaction if found, [ch.decent.sdk.exception.ObjectNotFoundException] otherwise
     */
    public abstract getTransaction(blockNum: number, trxInBlock: number): Observable<ProcessedTransaction>;

    /**
     * make a transfer
     *
     * @param keyPair private keys
     * @param from object id of the sender account, 1.2.*
     * @param to object id of the receiver account, 1.2.*
     * @param amount amount to send with asset type
     * @param memo optional message
     * @param encrypted encrypted is visible only for sender and receiver, unencrypted is visible publicly
     *
     * @return a transaction confirmation
     */
    public abstract transfer(
        keyPair: ECKeyPair,
        from: ChainObject,
        to: ChainObject,
        amount: AssetAmount,
        memo?: string,
        encrypted?: boolean,
    ): Observable<TransactionConfirmation>;

    /**
     * buy a content
     *
     * @param keyPair private keys
     * @param content
     * @param consumer object id of the consumer account, 1.2.*
     *
     * @return a transaction confirmation
     */
    public abstract buyContent(
        keyPair: ECKeyPair,
        content: Content,
        consumer: ChainObject,
    ): Observable<TransactionConfirmation>;

    /**
     * Returns fees for operation
     *
     * @param op list of operations
     *
     * @return a list of fee asset amounts
     */
    public abstract getFees(op: BaseOperation[]): Observable<AssetAmount[]>;

    /**
     * vote for miner
     *
     * @param keyPair private keys
     * @param accountId account id
     * @param voteIds list of miner vote ids
     *
     * @return a transaction confirmation
     */
    public abstract voteForMiners(
        keyPair: ECKeyPair,
        accountId: ChainObject,
        voteIds: string[],
    ): Observable<TransactionConfirmation>;

    /**
     * Returns list of miners by their Ids
     *
     * @param minerIds miner account ids
     *
     * @return a list of miners
     */
    public abstract getMiners(minerIds: ChainObject[]): Observable<Miner[]>;

    /**
     * Creates new account
     *
     * @param keyPair private keys
     * @param registrar account id of user registering a new account
     * @param name user name of the new account
     * @param owner public keys
     * @param active public keys
     * @param options user options
     *
     * @return a transaction confirmation
     */
    public abstract createAccount(
        keyPair: ECKeyPair,
        registrar: ChainObject,
        name: string,
        owner: Authority,
        active: Authority,
        options: Options,
    ): Observable<TransactionConfirmation>;

    protected abstract getBalanceInternal(account: ChainObject): Observable<AssetAmount[]>;

    protected abstract getAccountHistoryInternal(
        accountId: ChainObject,
        limit: number,
        startId: ChainObject,
        stopId: ChainObject,
        // limit: Int = 100,
        // startId: ChainObject = ChainObject.parse("1.7.0"),
        // stopId: ChainObject = ChainObject.parse("1.7.0")
    ): Observable<OperationHistory[]>;

}
