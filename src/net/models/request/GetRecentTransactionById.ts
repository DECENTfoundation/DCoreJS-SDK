import { ProcessedTransaction } from "../../../models/ProcessedTransaction";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetRecentTransactionById extends BaseRequest<ProcessedTransaction> {
    constructor(
        id: string,
    ) {
        super(
            ApiGroup.Database,
            "get_recent_transaction_by_id",
            [id],
            ProcessedTransaction,
        );
    }
}
