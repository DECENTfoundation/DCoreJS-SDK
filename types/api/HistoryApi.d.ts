import { Observable } from "rxjs";
import { DCoreSdk } from "../DCoreSdk";
import { ChainObject } from "../models/ChainObject";
import { OperationHistory } from "../models/OperationHistory";
export declare class HistoryApi {
    private core;
    constructor(core: DCoreSdk);
    protected getAccountHistory(accountId: ChainObject, startId?: ChainObject, stopId?: ChainObject, limit?: number): Observable<OperationHistory[]>;
}
