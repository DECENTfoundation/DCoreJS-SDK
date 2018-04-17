import { AssetAmount } from "./models/AssetAmount";
import { ChainObject } from "./models/ChainObject";

import { ContractAPI } from "./ContractAPI";

export class DcoreSDK implements ContractAPI {

    public getBalance(accountId: ChainObject): Promise<AssetAmount[]> {
        return null;
    }

    public getAccountByName(name: string): Promise<Account>;

    /**
     * get Account object by id
     *
     * @param accountId object id of the account, 1.2.*
     * @return an account if found, ObjectNotFoundException otherwise
     */

    public getAccountById(accountId: ChainObject): Promise<Account>;

    /**
     * search account history
     *
     * @param accountId object id of the account, 1.2.*
     * @param order
     * @param from object id of the history object to start from, use 0.0.0 to ignore
     * @param limit number of entries, max 100
     */

    public searchAccountHistory(
        accountId: ChainObject,
        order: SearchAccountHistoryOrder = SearchAccountHistoryOrder.TIME_DESC,
        from: ChainObject = ChainObject.NONE,
        limit: Int = 100
    ): Promise<TransactionDetail[]>;

    /**
     * search consumer open and history purchases
     *
     * @param consumer object id of the account, 1.2.*
     * @param orderc
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
}
