import { Transaction } from "../../../models/Transaction";
import { TransactionConfirmation } from "../../../models/TransactionConfirmation";
import { BaseRequest } from "./BaseRequest";
import { WithCallback } from "./WithCallback";
export declare class BroadcastTransactionWithCallback extends BaseRequest<TransactionConfirmation> implements WithCallback {
    callbackId: number;
    constructor(transaction: Transaction, callbackId: number);
}
