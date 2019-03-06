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

    /**
     * Broadcast operation to DCore
     *
     * @param privateKey EC key pair or Base58 encoded private key
     * @param operations operations to be submitted to DCore
     * @param expiration transaction expiration in seconds, after the expiry the transaction is removed from recent pool and will be dismissed if not included in DCore block
     */
    public broadcast(
        privateKey: ECKeyPair | string,
        operations: BaseOperation[],
        expiration: Duration = this.api.transactionExpiration,
    ): Observable<void> {
        return this.core.broadcast(BroadcastApi.getPrivate(privateKey), operations, expiration);
    }

    /**
     * Broadcast operation to DCore
     *
     * @param privateKey EC key pair or Base58 encoded private key
     * @param operations operations to be submitted to DCore
     * @param expiration transaction expiration in seconds, after the expiry the transaction is removed from recent pool and will be dismissed if not included in DCore block
     *
     * @return a transaction confirmation
     */
    public broadcastWithCallback(
        privateKey: ECKeyPair | string,
        operations: BaseOperation[],
        expiration: Duration = this.api.transactionExpiration,
    ): Observable<TransactionConfirmation> {
        return this.core.broadcastWithCallback(BroadcastApi.getPrivate(privateKey), operations, expiration);
    }
}
