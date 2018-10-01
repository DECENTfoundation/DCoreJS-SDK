import { ProcessedTransaction } from "./ProcessedTransaction";
export declare class TransactionConfirmation {
    id: string;
    blockNum: number;
    trxNum: number;
    transaction: ProcessedTransaction;
}
