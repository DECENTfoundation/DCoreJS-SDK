import { Duration } from "moment";
import { Observable } from "rxjs";
import { first, flatMap, map } from "rxjs/operators";
import { ECKeyPair } from "../crypto/ECKeyPair";
import { DCoreApi } from "../DCoreApi";
import { BaseOperation } from "../models/operation/BaseOperation";
import { Transaction } from "../models/Transaction";
import { TransactionConfirmation } from "../models/TransactionConfirmation";
import { BroadcastTransaction } from "../net/models/request/BroadcastTransaction";
import { BroadcastTransactionWithCallback } from "../net/models/request/BroadcastTransactionWithCallback";
import { BaseApi } from "./BaseApi";

export class BroadcastApi extends BaseApi {

    private static getPrivate(privateKey: ECKeyPair | string) {
        return typeof privateKey === "string" ? ECKeyPair.parseWif(privateKey) : privateKey;
    }

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * broadcast transaction to DCore
     * @param transaction transaction to broadcast
     */
    public broadcastTrx(transaction: Transaction): Observable<any> {
        return this.request(new BroadcastTransaction(transaction));
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
        return this.api.transactionApi.createTransaction(operations, expiration).pipe(
            map((trx) => trx.withSignature(BroadcastApi.getPrivate(privateKey))),
            flatMap((trx) => this.broadcastTrx(trx)),
        );
    }

    /**
     * Broadcast transaction to DCore with callback
     * @param transaction transaction to broadcast
     *
     * @return a transaction confirmation
     */
    public broadcastTrxWithCallback(transaction: Transaction): Observable<TransactionConfirmation> {
        return this.request(new BroadcastTransactionWithCallback(transaction)).pipe(first());
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
        return this.api.transactionApi.createTransaction(operations, expiration).pipe(
            map((trx) => trx.withSignature(BroadcastApi.getPrivate(privateKey))),
            flatMap((trx) => this.broadcastTrxWithCallback(trx)),
        );
    }
}
