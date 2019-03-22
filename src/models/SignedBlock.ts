import { Expose, Type } from "class-transformer";
import { Moment } from "moment";
import { ChainObjectToClass, MomentToClass } from "../utils/TypeAdapters";
import { ChainObject } from "./ChainObject";
import { ProcessedTransaction } from "./ProcessedTransaction";

export class SignedBlock {
    @Expose({ name: "previous" })
    public previous: string;

    @MomentToClass
    @Expose({ name: "timestamp" })
    public timestamp: Moment;

    @ChainObjectToClass
    @Expose({ name: "miner" })
    public miner: ChainObject;

    @Expose({ name: "transaction_merkle_root" })
    public transactionMerkleRoot: string;

    @Expose({ name: "miner_signature" })
    public minerSignature: string;

    @Type(() => ProcessedTransaction)
    @Expose({ name: "transactions" })
    public transactions: ProcessedTransaction[];

    @Expose({ name: "extensions" })
    public extensions: object[];
}
