import { Observable } from "rxjs";
import { DCoreSdk } from "../DCoreSdk";
import { ChainObject } from "../models/ChainObject";
import { ObjectType } from "../models/ObjectType";
import { OperationHistory } from "../models/OperationHistory";
import { GetAccountHistory } from "../net/models/request/GetAccountHistory";

export class HistoryApi {
    constructor(private core: DCoreSdk) {
    }

    protected getAccountHistory(
        accountId: ChainObject,
        startId: ChainObject = ObjectType.OperationHistory.genericId(),
        stopId: ChainObject = ObjectType.OperationHistory.genericId(),
        limit: number = 100,
    ): Observable<OperationHistory[]> {
        return this.core.request(new GetAccountHistory(accountId, stopId, limit, startId));
    }

}
