import { Moment } from "moment";
import { ECKeyPair } from "../crypto/ECKeyPair";
import { BlockData } from "./BlockData";
import { BaseOperation } from "./operation/BaseOperation";
export declare class Transaction {
    blockData: BlockData;
    operations: BaseOperation[];
    signatures: string[];
    expiration: Moment;
    refBlockNum: number;
    refBlockPrefix: number;
    extensions: any[];
    constructor(blockData: BlockData, ops: BaseOperation[]);
    sign(key: ECKeyPair): Transaction;
}
