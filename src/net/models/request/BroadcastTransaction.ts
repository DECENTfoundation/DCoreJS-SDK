import * as _ from "lodash";
import { Transaction } from "../../../models/Transaction";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class BroadcastTransaction extends BaseRequest<void> {
    public void: any = {};

    constructor(
        transaction: Transaction,
    ) {
        super(
            ApiGroup.Broadcast,
            "broadcast_transaction",
            [transaction],
            undefined,
            true,
        );
        assertThrow(!_.isEmpty(transaction.signatures), () => "transaction not signed, forgot to call .withSignature(key) ?");
    }
}
