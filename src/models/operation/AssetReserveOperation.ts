import { Expose, Type } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class AssetReserveOperation extends BaseOperation {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "payer" })
    public payer: ChainObject;

    @Type(() => AssetAmount)
    @Expose({ name: "amount_to_reserve" })
    public amount: AssetAmount;

    constructor(payer: ChainObject, amount: AssetAmount, fee?: AssetAmount | ChainObject) {
        super(OperationType.AssetReserve, fee);
        this.payer = payer;
        this.amount = amount;
    }
}
