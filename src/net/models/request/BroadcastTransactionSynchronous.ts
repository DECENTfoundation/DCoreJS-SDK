import { plainToClass } from "class-transformer";
import * as _ from "lodash";
import { Transaction } from "../../../models/Transaction";
import { TransactionConfirmation } from "../../../models/TransactionConfirmation";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class BroadcastTransactionSynchronous extends BaseRequest<TransactionConfirmation> {
    constructor(
        transaction: Transaction,
    ) {
        super(
            ApiGroup.Broadcast,
            "broadcast_transaction_synchronous",
            [transaction],
            (value: object) => plainToClass(TransactionConfirmation, value),
        );

        assertThrow(!_.isEmpty(transaction.signatures), () => "transaction not signed, forgot to call .withSignature(key) ?");
    }
}
