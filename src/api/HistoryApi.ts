import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { ChainObject } from "../models/ChainObject";
import { ObjectType } from "../models/ObjectType";
import { OperationHistory } from "../models/OperationHistory";
import { GetAccountHistory } from "../net/models/request/GetAccountHistory";
import { GetRelativeAccountHistory } from "../net/models/request/GetRelativeAccountHistory";
import { BaseApi } from "./BaseApi";

export class HistoryApi extends BaseApi {
    constructor(api: DCoreApi) {
        super(api);
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

}
