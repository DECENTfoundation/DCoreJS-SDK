import { Expose } from "class-transformer";
import { Moment } from "moment";
import { ChainObjectToClass, MomentToClass } from "../utils/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class BlockHeader {
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

}
