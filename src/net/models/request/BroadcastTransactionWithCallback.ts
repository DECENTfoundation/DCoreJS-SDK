import { plainToClass } from "class-transformer";
import { Transaction } from "../../../models/Transaction";
import { TransactionConfirmation } from "../../../models/TransactionConfirmation";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";
import { WithCallback } from "./WithCallback";

export class BroadcastTransactionWithCallback extends BaseRequest<TransactionConfirmation> implements WithCallback {
    public callbackId: number;

    constructor(
        transaction: Transaction,
        callbackId: number,
    ) {
        super(
            ApiGroup.Broadcast,
            "broadcast_transaction_with_callback",
            [callbackId, transaction],
            (value: object) => plainToClass(TransactionConfirmation, value),
        );
        this.callbackId = callbackId;
    }
}
