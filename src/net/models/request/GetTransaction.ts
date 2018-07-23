import { ProcessedTransaction } from "../../../models/ProcessedTransaction";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetTransaction extends BaseRequest<ProcessedTransaction> {
    constructor(
        blockNum: number,
        trxInBlock: number,
    ) {
        super(
            ApiGroup.Database,
            "get_transaction",
            [blockNum, trxInBlock],
            ProcessedTransaction,
        );
    }
}
