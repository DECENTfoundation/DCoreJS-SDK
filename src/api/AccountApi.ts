import { Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Address } from "../crypto/Address";
import { DCoreApi } from "../DCoreApi";
import { AccountRef } from "../DCoreSdk";
import { Account } from "../models/Account";
import { ChainObject } from "../models/ChainObject";
import { IllegalArgumentError } from "../models/error/IllegalArgumentError";
import { ObjectNotFoundError } from "../models/error/ObjectNotFoundError";
import { ObjectType } from "../models/ObjectType";
import { SearchAccountHistoryOrder } from "../models/order/SearchAccountHistoryOrder";
import { TransactionDetail } from "../models/TransactionDetail";
import { GetAccountById } from "../net/models/request/GetAccountById";
import { GetAccountByName } from "../net/models/request/GetAccountByName";
import { GetAccountCount } from "../net/models/request/GetAccountCount";
import { GetAccountReferences } from "../net/models/request/GetAccountReferences";
import { GetKeyReferences } from "../net/models/request/GetKeyReferences";
import { GetStatisticsById } from "../net/models/request/GetStatisticsById";
import { SearchAccountHistory } from "../net/models/request/SearchAccountHistory";
import { ObjectCheckOf } from "../utils/ObjectCheckOf";
import { BaseApi } from "./BaseApi";

export class AccountApi extends BaseApi {

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Check if the account exist.
     *
     * @param account account id or name
     *
     * @return account exists in DCore database
     */
    public exist(account: AccountRef): Observable<boolean> {
        return this.get(account).pipe(
            catchError((err) => {
                if (err instanceof ObjectNotFoundError || err instanceof TypeError) {
                    return of(false);
                } else {
                    return throwError(err);
                }
            }),
            map(() => true),
        );
    }

    /**
     * Get account object by name.
     *
     * @param name the name of the account
     *
     * @return an account if found, {@link ObjectNotFoundError} otherwise
     */
    public getByName(name: string): Observable<Account> {
        return this.request(new GetAccountByName(name));
    }

    /**
     * Get account by name or id.
     *
     * @param account account name or account id
     *
     * @return an account if exist, {@link ObjectNotFoundError} if not found, or {@link IllegalArgumentError} if the account name or id is not valid
     */
    public get(account: AccountRef): Observable<Account> {
        if (typeof account === "string") {
            if (ChainObject.isValid) {
                return this.get(ChainObject.parse(account));
            }
            if (Account.isValidName(account)) {
                return this.getByName(account);
            }
        }
        if (ObjectCheckOf<ChainObject>(account, "instance")) {
            return this.getAll([account]).pipe(map((list) => list[0]));
        }
        return throwError(new IllegalArgumentError("not a valid account name or id"));
    }

    /**
     * Get the total number of accounts registered on the blockchain.
     */
    public countAll(): Observable<number> {
        return this.request(new GetAccountCount());
    }

    /**
     * Get account object ids by public key addresses.
     *
     * @param keys formatted public keys of the account, eg. DCT5j2bMj7XVWLxUW7AXeMiYPambYFZfCcMroXDvbCfX1VoswcZG4
     *
     * @return a list of account object ids
     */
    public findAllReferencesByKeys(keys: Address[]): Observable<ChainObject[][]> {
        return this.request(new GetKeyReferences(keys));
    }

    /**
     * Get all accounts that refer to the account id in their owner or active authorities.
     *
     * @param accountId account object id
     *
     * @return a list of account object ids
     */
    public findAllReferencesByAccount(accountId: ChainObject): Observable<ChainObject[]> {
        return this.request(new GetAccountReferences(accountId));
    }

    /**
     * Get account objects by ids.
     *
     * @param accountIds object ids of the account, 1.2.*
     *
     * @return an account list if found, {@link ObjectNotFoundError} otherwise
     */
    public getAll(accountIds: ChainObject[]): Observable<Account[]> {
        return this.request(new GetAccountById(accountIds));
    }

    /**
     * search account history
     *
     * @param accountId object id of the account, 1.2.*
     * @param order
     * @param from object id of the history object to start from, use {@link ObjectType.Null.genericId()} to ignore
     * @param limit number of entries, max 100
     */
    public searchAccountHistory(
        accountId: ChainObject,
        order: SearchAccountHistoryOrder = SearchAccountHistoryOrder.TimeDesc,
        from: ChainObject = ObjectType.Null.genericId(),
        limit: number = 100,
    ): Observable<TransactionDetail[]> {
        return this.request(new SearchAccountHistory(accountId, order, from, limit));
    }

    /**
     * Get statistics by object id
     *
     * @param objectId object id of statistics
     * @return object if found, {@link ObjectNotFoundError} otherwise
     */
    public getStatisticsById(objectId: ChainObject): Observable<any> {
        return this.request(new GetStatisticsById(objectId));
    }
}
