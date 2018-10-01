import { ProcessedTransaction } from "../../../models/ProcessedTransaction";
import { BaseRequest } from "./BaseRequest";
export declare class GetRecentTransactionById extends BaseRequest<ProcessedTransaction> {
    constructor(id: string);
}
