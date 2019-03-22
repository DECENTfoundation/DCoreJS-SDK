import * as Long from "long";
import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { BalanceChange } from "../models/BalanceChange";
import { ChainObject } from "../models/ChainObject";
import { ObjectType } from "../models/ObjectType";
import { OperationHistory } from "../models/OperationHistory";
import { GetAccountBalanceForTransaction } from "../net/models/request/GetAccountBalanceForTransaction";
import { GetAccountHistory } from "../net/models/request/GetAccountHistory";
import { GetRelativeAccountHistory } from "../net/models/request/GetRelativeAccountHistory";
import { SearchAccountBalanceHistory } from "../net/models/request/SearchAccountBalanceHistory";
import { BaseApi } from "./BaseApi";

export class HistoryApi extends BaseApi {
    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Returns balance operation on the account and operation id.
     *
     * @param accountId object id of the account whose history should be queried, 1.2.*
     * @param operationId object id of the history object, 1.7.*
     *
     * @return an balance operation change
     */
    public getOperation(
        accountId: ChainObject,
        operationId: ChainObject,
    ): Observable<BalanceChange> {
        return this.request(new GetAccountBalanceForTransaction(accountId, operationId));
    }

    /**
     * Get account history of operations.
     *
     * @param accountId object id of the account whose history should be queried, 1.2.*
     * @param startId id of the history object to start from, use {@link ObjectType.OperationHistory.genericId} to ignore
     * @param stopId id of the history object to stop at, use {@link ObjectType.OperationHistory.genericId} to ignore
     * @param limit number of entries, max 100
     *
     * @return a list of operations performed by account, ordered from most recent to oldest
     */
    public listOperations(
        accountId: ChainObject,
        startId: ChainObject = ObjectType.OperationHistory.genericId(),
        stopId: ChainObject = ObjectType.OperationHistory.genericId(),
        limit: number = 100,
    ): Observable<OperationHistory[]> {
        return this.request(new GetAccountHistory(accountId, stopId, limit, startId));
    }

    /**
     * Get account history of operations.
     *
     * @param accountId object id of the account whose history should be queried, 1.2.*
     * @param start sequence number of the most recent operation to retrieve. 0 is default, which will start querying from the most recent operation
     * @param limit  maximum number of operations to retrieve (must not exceed 100)
     *
     * @return a list of operations performed by account, ordered from most recent to oldest
     */
    public listOperationsRelative(
        accountId: ChainObject,
        start: number = 0,
        limit: number = 100,
    ): Observable<OperationHistory[]> {
        return this.request(new GetRelativeAccountHistory(accountId, 0, limit, start));
    }

    /**
     * Returns the most recent balance operations on the named account.
     * This returns a list of operation history objects, which describe activity on the account.
     *
     * @param accountId object id of the account whose history should be queried, 1.2.*
     * @param assets list of asset object ids to filter or empty for all assets
     * @param recipientAccount partner account object id to filter transfers to specific account, 1.2.* or null
     * @param fromBlock filtering parameter, starting block number (can be determined from time) or zero when not used
     * @param toBlock filtering parameter, ending block number or zero when not used
     * @param startOffset  starting offset from zero
     * @param limit the number of entries to return (starting from the most recent), max 100
     *
     * @return a list of balance changes
     */
    public findAllOperations(
        accountId: ChainObject,
        assets: ChainObject[] = [],
        recipientAccount?: ChainObject,
        fromBlock: Long = Long.ZERO,
        toBlock: Long = Long.ZERO,
        startOffset: Long = Long.ZERO,
        limit: number = 100,
    ): Observable<BalanceChange[]> {
        return this.request(new SearchAccountBalanceHistory(accountId, assets, recipientAccount, fromBlock, toBlock, startOffset, limit));
    }

}
