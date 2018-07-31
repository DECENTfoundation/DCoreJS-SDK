import { Exclude, Expose } from "class-transformer";
import { BlockData } from "./BlockData";
import { BaseOperation } from "./operation/BaseOperation";

export class Transaction {
    @Exclude()
    public blockData: BlockData;

    @Expose({ name: "operations" })
    public operations: BaseOperation[];

    @Expose({ name: "signatures" })
    public signatures: string[];

    @Expose({ name: "expiration" })
    public expiration: Date;

    @Expose({ name: "ref_block_num" })
    public refBlockNum: number;

    @Expose({ name: "ref_block_prefix" })
    public refBlockPrefix: number;

    @Expose({ name: "extensions" })
    public extensions: any[];
}
