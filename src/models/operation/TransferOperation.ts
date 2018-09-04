import { Expose, Transform, Type } from "class-transformer";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { Memo } from "../Memo";
import { OperationType } from "../OperationType";
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

    @Type(() => ChainObject)
    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "from" })
    public from: ChainObject;

    @Type(() => ChainObject)
    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "to" })
    public to: ChainObject;

    @Type(() => AssetAmount)
    @Expose({ name: "amount" })
    public amount: AssetAmount;

    @Type(() => Memo)
    @Expose({ name: "memo" })
    public memo?: Memo;

    constructor(from: ChainObject, to: ChainObject, amount: AssetAmount, memo?: Memo, fee?: AssetAmount) {
        super(OperationType.Transfer2);
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.memo = memo;
        this.fee = fee;
    }
}
