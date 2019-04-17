import { Expose, Type } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class AssetFundPoolsOperation extends BaseOperation {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "from_account" })
    public from: ChainObject;

    @Type(() => AssetAmount)
    @Expose({ name: "uia_asset" })
    public uia: AssetAmount;

    @Type(() => AssetAmount)
    @Expose({ name: "dct_asset" })
    public dct: AssetAmount;

    constructor(from: ChainObject, uia: AssetAmount, dct: AssetAmount) {
        super(OperationType.AssetFundPools);
        this.from = from;
        this.uia = uia;
        this.dct = dct;
    }

}
