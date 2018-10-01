import { ProcessedTransaction } from "../../../models/ProcessedTransaction";
import { BaseRequest } from "./BaseRequest";
export declare class GetTransaction extends BaseRequest<ProcessedTransaction> {
    constructor(blockNum: number, trxInBlock: number);
}
