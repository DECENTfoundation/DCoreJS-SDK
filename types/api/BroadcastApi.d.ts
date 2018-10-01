import { Observable } from "rxjs";
import { ECKeyPair } from "../crypto/ECKeyPair";
import { DCoreSdk } from "../DCoreSdk";
import { BaseOperation } from "../models/operation/BaseOperation";
import { TransactionConfirmation } from "../models/TransactionConfirmation";
export declare class BroadcastApi {
    private core;
    private static getPrivate;
    constructor(core: DCoreSdk);
    broadcast(privateKey: ECKeyPair | string, ...operations: BaseOperation[]): Observable<void>;
    broadcastWithCallback(privateKey: ECKeyPair | string, ...operations: BaseOperation[]): Observable<TransactionConfirmation>;
}
