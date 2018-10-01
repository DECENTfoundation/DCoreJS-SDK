import { Transaction } from "../../../models/Transaction";
import { BaseRequest } from "./BaseRequest";
export declare class BroadcastTransaction extends BaseRequest<void> {
    constructor(transaction: Transaction);
}
