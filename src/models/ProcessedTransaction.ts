import { Expose, Transform } from "class-transformer";
import { Moment } from "moment";
import * as moment from "moment";
import { BaseOperation } from "./operation/BaseOperation";

export class ProcessedTransaction {
    @Expose({ name: "signatures" })
    public signatures: string[];

    @Expose({ name: "extensions" })
    public extensions: any[];

    // todo parse operations by type
    @Expose({ name: "operations" })
    public operations: BaseOperation[];

    @Expose({ name: "expiration" })
    @Transform((value: string) => moment.utc(value), { toClassOnly: true })
    public expiration: Moment;

    @Expose({ name: "ref_block_num" })
    public refBlockNum: number;

    @Expose({ name: "ref_block_prefix" })
    public refBlockPrefix: number;

    @Expose({ name: "operation_results" })
    public opResults: any[];
}
