import { plainToClass } from "class-transformer";
import { ProcessedTransaction } from "../../../models/ProcessedTransaction";
import { assertThrow } from "../../../utils/Utils";
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
            (value: object) => plainToClass(ProcessedTransaction, value),
        );

        assertThrow(Buffer.from(id, "hex").length === 20, () => "not a valid transaction id");
    }
}
