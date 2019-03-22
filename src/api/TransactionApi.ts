import * as Long from "long";
import { Duration } from "moment";
import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { DCoreSdk } from "../DCoreSdk";
import { ChainObject } from "../models/ChainObject";
import { BaseOperation } from "../models/operation/BaseOperation";
import { ProcessedTransaction } from "../models/ProcessedTransaction";
import { Transaction } from "../models/Transaction";
import { TransactionConfirmation } from "../models/TransactionConfirmation";
import { GetProposedTransactions } from "../net/models/request/GetProposedTransactions";
import { GetRecentTransactionById } from "../net/models/request/GetRecentTransactionById";
import { GetTransaction } from "../net/models/request/GetTransaction";
import { GetTransactionById } from "../net/models/request/GetTransactionById";
import { GetTransactionHex } from "../net/models/request/GetTransactionHex";
import { BaseApi } from "./BaseApi";

export class TransactionApi extends BaseApi {

    constructor(api: DCoreApi, private core: DCoreSdk) {
        super(api);
    }

    /**
     * Create unsigned transaction
     *
     * @param operations operations to include in transaction
     * @param expiration transaction expiration in seconds, after the expiry the transaction is removed from recent pool
     * and will be dismissed if not included in DCore block
     */
    public createTransaction(operations: BaseOperation[], expiration: Duration = this.api.transactionExpiration): Observable<Transaction> {
        return this.core.prepareTransaction(operations, expiration);
    }

    /**
     * Get the set of proposed transactions relevant to the specified account id.
     *
     * @param accountId account object id, 1.2.*
     *
     * @return a set of proposed transactions
     */
    // todo model
    public getAllProposed(accountId: ChainObject) {
        return this.request(new GetProposedTransactions(accountId));
    }

    /**
     * If the transaction has not expired, this method will return the transaction for the given ID or it will return {@link ObjectNotFoundError}
     * Just because it is not known does not mean it wasn't included in the DCore.
     * The ID can be retrieved from [Transaction] or [TransactionConfirmation] objects.
     *
     * @param trxId transaction id
     *
     * @return a transaction if found, {@link ObjectNotFoundError} otherwise
     */
    public getRecent(trxId: string): Observable<ProcessedTransaction> {
        return this.request(new GetRecentTransactionById(trxId));
    }

    /**
     * This method will return the transaction for the given ID or it will return [ch.decent.sdk.exception.ObjectNotFoundException].
     * The ID can be retrieved from [Transaction] or [TransactionConfirmation] objects.
     *
     * Note: By default these objects are not tracked, the transaction_history_plugin must be loaded for these objects to be maintained.
     * Just because it is not known does not mean it wasn't included in the DCore.
     *
     * @param trxId transaction id
     *
     * @return a transaction if found, {@link ObjectNotFoundError} otherwise
     */
    public getById(trxId: string): Observable<ProcessedTransaction> {
        return this.request(new GetTransactionById(trxId));
    }

    /**
     * get applied transaction
     *
     * @param blockNum block number
     * @param trxInBlock position of the transaction in block
     *
     * @return a transaction if found, {@link ObjectNotFoundError} otherwise
     */
    public get(blockNum: Long | number, trxInBlock: Long | number): Observable<ProcessedTransaction> {
        return this.request(new GetTransaction(blockNum, trxInBlock));
    }

    /**
     * get applied transaction
     *
     * @param confirmation confirmation returned from transaction broadcast
     *
     * @return a transaction if found, {@link ObjectNotFoundError} otherwise
     */
    public getByConfirmation(confirmation: TransactionConfirmation): Observable<ProcessedTransaction> {
        return this.get(confirmation.blockNum, confirmation.trxNum);
    }

    /**
     * Get a hexdump of the serialized binary form of a transaction.
     *
     * @param transaction a signed transaction
     *
     * @return hexadecimal string
     */
    public getHexDump(transaction: Transaction): Observable<string> {
        return this.request(new GetTransactionHex(transaction));
    }
}
