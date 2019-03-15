import { plainToClass } from "class-transformer";
import { ProcessedTransaction } from "../../../models/ProcessedTransaction";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetTransactionById extends BaseRequest<ProcessedTransaction> {
    constructor(
        trxId: string,
    ) {
        super(
            ApiGroup.Database,
            "get_transaction_by_id",
            [trxId],
            (value: object) => plainToClass(ProcessedTransaction, value),
        );
    }
}
