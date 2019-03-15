import { classToPlain, plainToClass } from "class-transformer";
import { ProcessedTransaction } from "../../../models/ProcessedTransaction";
import { Transaction } from "../../../models/Transaction";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class ValidateTransaction extends BaseRequest<ProcessedTransaction> {
    constructor(
        transaction: Transaction,
    ) {
        super(
            ApiGroup.Database,
            "validate_transaction",
            [classToPlain(transaction)],
            (value: object) => plainToClass(ProcessedTransaction, value),
        );
    }
}
