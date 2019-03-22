import { classToPlain } from "class-transformer";
import { Transaction } from "../../../models/Transaction";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetTransactionHex extends BaseRequest<string> {
    constructor(
        transaction: Transaction,
    ) {
        super(
            ApiGroup.Database,
            "get_transaction_hex",
            [classToPlain(transaction)],
        );
    }
}
