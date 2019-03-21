import * as _ from "lodash";
import * as Long from "long";
import { Observable, of, throwError } from "rxjs";
import { scalar } from "rxjs/internal/observable/scalar";
import { catchError, flatMap, map, mapTo } from "rxjs/operators";
import { Address } from "../crypto/Address";
import { Credentials } from "../crypto/Credentials";
import { DCoreApi } from "../DCoreApi";
import { AccountRef } from "../DCoreSdk";
import { Account } from "../models/Account";
import { AssetAmount } from "../models/AssetAmount";
import { ChainObject } from "../models/ChainObject";
import { IllegalArgumentError } from "../models/error/IllegalArgumentError";
import { ObjectNotFoundError } from "../models/error/ObjectNotFoundError";
import { FullAccount } from "../models/FullAccount";
import { Memo } from "../models/Memo";
import { ObjectType } from "../models/ObjectType";
import { TransferOperation } from "../models/operation/TransferOperation";
import { SearchAccountsOrder } from "../models/order/SearchAccountsOrder";
import { TransactionConfirmation } from "../models/TransactionConfirmation";
import { GetAccountById } from "../net/models/request/GetAccountById";
import { GetAccountByName } from "../net/models/request/GetAccountByName";
import { GetAccountCount } from "../net/models/request/GetAccountCount";
import { GetAccountReferences } from "../net/models/request/GetAccountReferences";
import { GetFullAccounts } from "../net/models/request/GetFullAccounts";
import { GetKeyReferences } from "../net/models/request/GetKeyReferences";
import { LookupAccountNames } from "../net/models/request/LookupAccountNames";
import { LookupAccounts } from "../net/models/request/LookupAccounts";
import { SearchAccounts } from "../net/models/request/SearchAccounts";
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
            mapTo(true),
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
            if (ChainObject.isValid(account)) {
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
    public countAll(): Observable<Long> {
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
     * Fetch all objects relevant to the specified accounts and subscribe to updates.
     *
     * @param namesOrIds list of account names or ids
     * @param subscribe true to subscribe to updates
     *
     * @return map of names or ids to account, or empty map if not present
     */
    public getFullAccounts(namesOrIds: string[], subscribe: boolean = false): Observable<Map<string, FullAccount>> {
        return this.request(new GetFullAccounts(namesOrIds, subscribe));
    }

    /**
     * Get a list of accounts by name.
     *
     * @param names account names to retrieve
     *
     * @return list of accounts or {@link ObjectNotFoundError} if none exist
     */
    public getAllByNames(names: string[]): Observable<Account[]> {
        return this.request(new LookupAccountNames(names));
    }

    /**
     * Get names and IDs for registered accounts.
     *
     * @param lowerBound lower bound of the first name to return
     * @param limit number of items to get, max 1000
     *
     * @return map of account names to corresponding IDs
     */
    public listAllRelative(lowerBound: string, limit: number = 1000): Observable<Map<string, ChainObject>> {
        return this.request(new LookupAccounts(lowerBound, limit));
    }

    /**
     * Get registered accounts that match search term.
     *
     * @param searchTerm will try to partially match account name or id
     * @param order sort data by field
     * @param id object id to start searching from
     * @param limit number of items to get, max 1000
     *
     * @return list of found accounts
     */
    public findAll(
        searchTerm: string,
        order: SearchAccountsOrder = SearchAccountsOrder.NameDesc,
        id: ChainObject = ObjectType.Null.genericId(),
        limit: number = 1000,
    ): Observable<Account[]> {
        return this.request(new SearchAccounts(searchTerm, order, id, limit));
    }

    /**
     * Create API credentials.
     *
     * @param accountName account name
     * @param privateKey private key in wif base58 format, eg. 5Jd7zdvxXYNdUfnEXt5XokrE3zwJSs734yQ36a1YaqioRTGGLtn
     *
     * @return credentials
     */
    public createCredentials(accountName: string, privateKey: string): Observable<Credentials> {
        return this.getByName(accountName).pipe(map((acc) => new Credentials(acc.id, privateKey)));
    }

    /**
     * Create a transfer operation.
     *
     * @param credentials account credentials
     * @param account account id or account name
     * @param amount amount to send with asset type
     * @param memo optional message
     * @param encrypted encrypted is visible only for sender and receiver, unencrypted is visible publicly
     * @param fee {@link AssetAmount} fee for the operation, if left undefined the fee will be computed in DCT asset
     *
     * @return a transaction confirmation
     */
    public createTransfer(
        credentials: Credentials,
        account: AccountRef,
        amount: AssetAmount,
        memo?: string,
        encrypted: boolean = true,
        fee?: AssetAmount,
    ): Observable<TransferOperation> {
        if ((_.isNil(memo) || !encrypted) && (typeof account !== "string" || ChainObject.isValid(account))) {
            return scalar(new TransferOperation(
                credentials.account,
                (typeof account === "string") ? ChainObject.parse(account) : account,
                amount,
                _.isNil(memo) ? memo : Memo.createPublic(memo),
                fee));
        } else {
            return this.get(account).pipe(map((acc) => new TransferOperation(
                credentials.account,
                acc.id,
                amount,
                _.isNil(memo) ? memo : (encrypted ? Memo.createEncrypted(memo, credentials.keyPair, acc.primaryAddress) : Memo.createPublic(memo)),
                fee,
            )));
        }
    }

    /**
     * Make a transfer.
     *
     * @param credentials account credentials
     * @param account account id or account name
     * @param amount amount to send with asset type
     * @param memo optional message
     * @param encrypted encrypted is visible only for sender and receiver, unencrypted is visible publicly
     * @param fee {@link AssetAmount} fee for the operation, if left undefined the fee will be computed in DCT asset
     *
     * @return a transaction confirmation
     */
    public transfer(
        credentials: Credentials,
        account: AccountRef,
        amount: AssetAmount,
        memo?: string,
        encrypted: boolean = true,
        fee?: AssetAmount,
    ): Observable<TransactionConfirmation> {
        return this.createTransfer(credentials, account, amount, memo, encrypted, fee).pipe(flatMap((operation) =>
            this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [operation])));
    }
}
