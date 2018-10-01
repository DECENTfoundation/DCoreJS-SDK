import { Observable } from "rxjs";
import { DCoreSdk } from "../DCoreSdk";
import { ProcessedTransaction } from "../models/ProcessedTransaction";
export declare class TransactionApi {
    private core;
    constructor(core: DCoreSdk);
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
    getRecentTransaction(trxId: string): Observable<ProcessedTransaction>;
    /**
     * get applied transaction
     *
     * @param blockNum block number
     * @param trxInBlock position of the transaction in block
     *
     * @return a transaction if found, {@link NotFoundError} otherwise
     */
    getTransaction(blockNum: number, trxInBlock: number): Observable<ProcessedTransaction>;
}
