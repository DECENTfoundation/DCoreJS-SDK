import { ChainObject } from "./ChainObject";
export declare class OperationHistory {
    id: ChainObject;
    op: any;
    result: any;
    blockNum: number;
    trxInBlock: number;
    opNum: number;
    virtualOp: number;
}
