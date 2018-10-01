import { Duration } from "moment";
import { Observable } from "rxjs";
import { ECKeyPair } from "../crypto/ECKeyPair";
import { DCoreApi } from "../DCoreApi";
import { DCoreSdk } from "../DCoreSdk";
import { BaseOperation } from "../models/operation/BaseOperation";
import { TransactionConfirmation } from "../models/TransactionConfirmation";
import { BaseApi } from "./BaseApi";

export class BroadcastApi extends BaseApi {

    private static getPrivate(privateKey: ECKeyPair | string) {
        return typeof privateKey === "string" ? ECKeyPair.parseWif(privateKey) : privateKey;
    }

    constructor(api: DCoreApi, private core: DCoreSdk) {
        super(api);
    }

    public broadcast(
        privateKey: ECKeyPair | string,
        operations: BaseOperation[],
        transactionExpiration: Duration = this.api.transactionExpiration,
    ): Observable<void> {
        return this.core.broadcast(BroadcastApi.getPrivate(privateKey), operations, transactionExpiration);
    }

    public broadcastWithCallback(
        privateKey: ECKeyPair | string,
        operations: BaseOperation[],
        transactionExpiration: Duration = this.api.transactionExpiration,
    ): Observable<TransactionConfirmation> {
        return this.core.broadcastWithCallback(BroadcastApi.getPrivate(privateKey), operations, transactionExpiration);
    }
}
