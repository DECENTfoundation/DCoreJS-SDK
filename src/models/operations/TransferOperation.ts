import { Expose } from "class-transformer";
import { OperationType } from "../../net/models/OperationType";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { Memo } from "../Memo";
import { BaseOperation } from "./BaseOperation";

/**
 * Transfer operation constructor
 *
 * @param from account object id of the sender
 * @param to account object id of the receiver
 * @param amount an amount and asset type to transfer
 * @param memo optional string note
 */
export class TransferOperation extends BaseOperation {
    @Expose({ name: "from" })
    public from: ChainObject;

    @Expose({ name: "to" })
    public to: ChainObject;

    @Expose({ name: "amount" })
    public amount: AssetAmount;

    @Expose({ name: "memo" })
    public memo?: Memo;

    constructor(from: ChainObject, to: ChainObject, amount: AssetAmount, memo?: Memo, fee?: AssetAmount) {
        super(OperationType.Transfer);
        this.from = from;
        this.to = to;
        this.memo = memo;
    }
}
