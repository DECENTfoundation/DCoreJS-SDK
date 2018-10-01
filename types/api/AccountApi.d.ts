import { Observable } from "rxjs";
import { Address } from "../crypto/Address";
import { DCoreSdk } from "../DCoreSdk";
import { Account } from "../models/Account";
import { ChainObject } from "../models/ChainObject";
import { SearchAccountHistoryOrder } from "../models/order/SearchAccountHistoryOrder";
import { TransactionDetail } from "../models/TransactionDetail";
export declare class AccountApi {
    private core;
    constructor(core: DCoreSdk);
    /**
     * get Account object by name
     *
     * @param accountName the name of the account
     * @return an account if found, {@link NotFoundError} otherwise
     */
    getAccountByName(accountName: string): Observable<Account>;
    /**
     * get Account objects by ids
     *
     * @param accountId object ids of the account, 1.2.*
     * @return accounts if found, {@link NotFoundError} otherwise
     */
    getAccountsById(accountId: ChainObject[]): Observable<Account[]>;
    /**
     * get Account object ids referenced by public keys
     *
     * @param keys public keys
     * @return account ids referencing the public keys, {@link NotFoundError} otherwise
     */
    getAccountIdsByKey(keys: Address[]): Observable<ChainObject[][]>;
    /**
     * search account history
     *
     * @param accountId object id of the account, 1.2.*
     * @param order
     * @param from object id of the history object to start from, use {@link ObjectType.Null.genericId()} to ignore
     * @param limit number of entries, max 100
     */
    searchAccountHistory(accountId: ChainObject, order?: SearchAccountHistoryOrder, from?: ChainObject, limit?: number): Observable<TransactionDetail[]>;
}
