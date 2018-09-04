import { Transaction } from "../../../models/Transaction";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class BroadcastTransaction extends BaseRequest<void> {
    constructor(
        transaction: Transaction,
    ) {
        super(
            ApiGroup.Broadcast,
            "broadcast_transaction",
            [transaction],
        );
    }
}
