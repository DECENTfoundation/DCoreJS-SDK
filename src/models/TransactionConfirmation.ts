import { Expose, Type } from "class-transformer";
import { ProcessedTransaction } from "./ProcessedTransaction";

export class TransactionConfirmation {
    @Expose({ name: "id" })
    public id: string;

    @Expose({ name: "block_num" })
    public blockNum: number;

    @Expose({ name: "trx_num" })
    public trxNum: number;

    @Type(() => ProcessedTransaction)
    @Expose({ name: "trx" })
    public transaction: ProcessedTransaction;
}
