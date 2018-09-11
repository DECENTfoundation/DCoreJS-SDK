import { Observable } from "rxjs";
import { ECKeyPair } from "../crypto/ECKeyPair";
import { DCoreSdk } from "../DCoreSdk";
import { BaseOperation } from "../models/operation/BaseOperation";
import { TransactionConfirmation } from "../models/TransactionConfirmation";

export class BroadcastApi {

    private static getPrivate(privateKey: ECKeyPair | string) {
        return typeof privateKey === "string" ? ECKeyPair.parseWif(privateKey) : privateKey;
    }

    constructor(private core: DCoreSdk) {
    }

    public broadcast(privateKey: ECKeyPair | string, ...operations: BaseOperation[]): Observable<void> {
        return this.core.broadcast(BroadcastApi.getPrivate(privateKey), ...operations);
    }

    public broadcastWithCallback(privateKey: ECKeyPair | string, ...operations: BaseOperation[]): Observable<TransactionConfirmation> {
        return this.core.broadcastWithCallback(BroadcastApi.getPrivate(privateKey), ...operations);
    }
}
