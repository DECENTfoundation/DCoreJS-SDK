import { plainToClass } from "class-transformer";
import { ProcessedTransaction } from "../../../models/ProcessedTransaction";
import { assertThrow } from "../../../utils/Utils";
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

        assertThrow(Buffer.from(trxId, "hex").length === 20, () => "not a valid transaction id");
    }
}
