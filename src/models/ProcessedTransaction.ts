import { Expose } from "class-transformer";
import * as Long from "long";
import { Moment } from "moment";
import { LongToClass, MomentToClass } from "../utils/TypeAdapters";
import { BaseOperation } from "./operation/BaseOperation";

export class ProcessedTransaction {
    @Expose({ name: "signatures" })
    public signatures: string[];

    @Expose({ name: "extensions" })
    public extensions: any[];

    // todo parse operations by type
    @Expose({ name: "operations" })
    public operations: BaseOperation[];

    @MomentToClass
    @Expose({ name: "expiration" })
    public expiration: Moment;

    @Expose({ name: "ref_block_num" })
    public refBlockNum: number;

    @LongToClass
    @Expose({ name: "ref_block_prefix" })
    public refBlockPrefix: Long;

    @Expose({ name: "operation_results" })
    public opResults: any[];
}
