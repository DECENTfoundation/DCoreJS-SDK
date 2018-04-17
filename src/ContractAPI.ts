
import { Account } from "./models/Account";
import { AssetAmount } from "./models/AssetAmount";
import { ChainObject } from "./models/ChainObject";
import { AccountHistoryOrder } from "./net/models/AccountHistoryOrder";

export interface ContractAPI {

    /**
     * get account balance
     *
     * @param accountId object id of the account, 1.2.*
     * @return list of amounts for different assets
     */

    getBalance(accountId: ChainObject): Promise<AssetAmount[]>;

    /**
     * get Account object by name
     *
     * @param name the name of the account
     * @return an account if found, ObjectNotFoundException otherwise
     */

    getAccountByName(name: string): Promise<Account>;

    /**
     * get Account object by id
     *
     * @param accountId object id of the account, 1.2.*
     * @return an account if found, ObjectNotFoundException otherwise
     */

    getAccountById(accountId: ChainObject): Promise<Account>;

    /**
     * search account history
     *
     * @param accountId object id of the account, 1.2.*
     * @param order
     * @param from object id of the history object to start from, use 0.0.0 to ignore
     * @param limit number of entries, max 100
     */

    searchAccountHistory(
        accountId: ChainObject,
        order: AccountHistoryOrder = AccountHistoryOrder.TimeDesc,
        from: ChainObject = ChainObject.NONE,
        limit: Int = 100
    ): Promise<TransactionDetail[]>;

    /**
     * search consumer open and history purchases
     *
     * @param consumer object id of the account, 1.2.*
     * @param order
     * @param from object id of the history object to start from, use 0.0.0 to ignore
     * @param limit number of entries, max 100
     */

    searchPurchases(
        consumer: ChainObject,
        order: SearchPurchasesOrder = SearchPurchasesOrder.PURCHASED_DESC,
        from: ChainObject = ChainObject.NONE,
        term: String = "",
        limit: Int = 100
    ): Promise<Purchase[]>

    /**
     * get consumer buying by content uri
     *
     * @param consumer object id of the account, 1.2.*
     * @param uri a uri of the content
     *
     * @return an account if found, ObjectNotFoundException otherwise
     */

    getPurchase(
        consumer: ChainObject,
        uri: string
    ): Promise<Purchase>;

    /**
     * get content by id
     *
     * @param contentId object id of the content, 2.13.*
     *
     * @return a content if found, ObjectNotFoundException otherwise
     */

    getContent(contentId: ChainObject): Promise<Content>

    /**
     * get content by uri
     *
     * @param uri Uri of the content
     *
     * @return a content if found, ObjectNotFoundException otherwise
     */

    getContent(uri: String): Promise<Content>

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

    transfer(
        keyPair: ECKeyPair,
        from: ChainObject,
        to: ChainObject,
        amount: AssetAmount,
        memo: String?= null,
        encrypted: Boolean = true
    ): Promise<TransactionConfirmation>;

    /**
     * make a transfer
     *
     * @param credentials user credentials
     * @param to object id of the receiver account, 1.2.*
     * @param amount amount to send with asset type
     * @param memo optional message
     * @param encrypted encrypted is visible only for sender and receiver, unencrypted is visible publicly
     *
     * @return a transaction confirmation
     */

    transfer(
        credentials: Credentials,
        to: ChainObject,
        amount: AssetAmount,
        memo: String?= null,
        encrypted: Boolean = true
    ): Promise<TransactionConfirmation>;

    buyContent(
        keyPair: ECKeyPair,
        content: Content,
        consumer: ChainObject
    ): Promise<TransactionConfirmation>;

    /**
     * buy a content by id
     *
     * @param keyPair private keys
     * @param contentId object id of the content, 2.13.*
     * @param consumer object id of the consumer account, 1.2.*
     *
     * @return a transaction confirmation
     */

    buyContent(
        keyPair: ECKeyPair,
        contentId: ChainObject,
        consumer: ChainObject
    ): Promise<TransactionConfirmation>;

    /**
     * buy a content by uri
     *
     * @param keyPair private keys
     * @param uri Uri of the content
     * @param consumer object id of the consumer account, 1.2.*
     *
     * @return a transaction confirmation
     */

    buyContent(
        keyPair: ECKeyPair,
        uri: String,
        consumer: ChainObject
    ): Promise<TransactionConfirmation>;

    /**
     * buy a content
     *
     * @param credentials user credentials
     * @param content
     *
     * @return a transaction confirmation
     */

    buyContent(
        credentials: Credentials,
        content: Content
    ): Promise<TransactionConfirmation>;