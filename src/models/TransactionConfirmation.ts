import { Expose } from "class-transformer";
import * as Long from "long";
import { LongToClass } from "../utils/TypeAdapters";
import { ProcessedTransaction } from "./ProcessedTransaction";

export class TransactionConfirmation {
    @Expose({ name: "id" })
    public id: string;

    @LongToClass
    @Expose({ name: "block_num" })
    public blockNum: Long;

    @LongToClass
    @Expose({ name: "trx_num" })
    public trxNum: Long;

    @Expose({ name: "trx" })
    public transaction: ProcessedTransaction;
}
