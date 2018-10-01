import { Duration } from "moment";
import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { DCoreSdk } from "../DCoreSdk";
import { BaseOperation } from "../models/operation/BaseOperation";
import { ProcessedTransaction } from "../models/ProcessedTransaction";
import { GetRecentTransactionById } from "../net/models/request/GetRecentTransactionById";
import { GetTransaction } from "../net/models/request/GetTransaction";
import { BaseApi } from "./BaseApi";

export class TransactionApi extends BaseApi {

    constructor(api: DCoreApi, private core: DCoreSdk) {
        super(api);
    }

    /**
     * If the transaction has not expired, this method will return the transaction for the given ID or it will return
     * {@link NotFoundError} Just because it is not known does not mean it wasn't included
     * in the blockchain. The ID can be retrieved from [Transaction] or [TransactionConfirmation] objects.
     * You can set up a custom expiration value in {@link DCoreSdk.transactionExpiration}
     *
     * @param trxId transaction id
     *
     *  @return a transaction if found, {@link NotFoundError} otherwise
     */
    public getRecentTransaction(trxId: string): Observable<ProcessedTransaction> {
        return this.request(new GetRecentTransactionById(trxId));
    }

    /**
     * get applied transaction
     *
     * @param blockNum block number
     * @param trxInBlock position of the transaction in block
     *
     * @return a transaction if found, {@link NotFoundError} otherwise
     */
    public getTransaction(blockNum: number, trxInBlock: number): Observable<ProcessedTransaction> {
        return this.request(new GetTransaction(blockNum, trxInBlock));
    }

    /**
     * create unsigned transaction
     *
     * @param operations operations to include in transaction
     * @param transactionExpiration transaction expiration in seconds,
     * after the expiry the transaction is removed from recent pool and will be dismissed if not included in DCore block
     */
    public createTransaction(operations: BaseOperation[], transactionExpiration: Duration = this.api.transactionExpiration) {
        this.core.prepareTransaction(operations, transactionExpiration);
    }

}
