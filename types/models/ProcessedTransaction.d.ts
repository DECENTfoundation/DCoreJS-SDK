import { Moment } from "moment";
import { BaseOperation } from "./operation/BaseOperation";
export declare class ProcessedTransaction {
    signatures: string[];
    extensions: any[];
    operations: BaseOperation[];
    expiration: Moment;
    refBlockNum: number;
    refBlockPrefix: number;
    opResults: any[];
}
