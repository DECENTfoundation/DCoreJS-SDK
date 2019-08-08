import { Expose, Type } from "class-transformer";
import { Fee } from "../../DCoreClient";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
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
     *      * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    constructor(from: ChainObject, to: ChainObject, amount: AssetAmount, memo?: Memo, fee?: Fee) {
        super(OperationType.Transfer2, fee);
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.memo = memo;
    }
}
