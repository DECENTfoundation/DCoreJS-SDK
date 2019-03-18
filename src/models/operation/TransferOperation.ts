import { Expose, Type } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../../utils/TypeAdapters";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { Memo } from "../Memo";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class TransferOperation extends BaseOperation {

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "from" })
    public from: ChainObject;

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "to" })
    public to: ChainObject;

    @Type(() => AssetAmount)
    @Expose({ name: "amount" })
    public amount: AssetAmount;

    @Type(() => Memo)
    @Expose({ name: "memo" })
    public memo?: Memo;

    /**
     * Transfer operation constructor
     *
     * @param from account object id of the sender
     * @param to account object id or content object id of the receiver
     * @param amount an [AssetAmount] to transfer
     * @param memo optional string note
     * @param fee {@link AssetAmount} fee for the operation, if left undefined the fee will be computed in DCT asset
     */
    constructor(from: ChainObject, to: ChainObject, amount: AssetAmount, memo?: Memo, fee?: AssetAmount) {
        super(OperationType.Transfer2);
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.memo = memo;
        this.fee = fee;
    }
}
