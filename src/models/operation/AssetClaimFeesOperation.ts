import { Expose, Type } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class AssetClaimFeesOperation extends BaseOperation {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "issuer" })
    public issuer: ChainObject;

    @Type(() => AssetAmount)
    @Expose({ name: "uia_asset" })
    public uia: AssetAmount;

    @Type(() => AssetAmount)
    @Expose({ name: "dct_asset" })
    public dct: AssetAmount;

    constructor(issuer: ChainObject, uia: AssetAmount, dct: AssetAmount, fee?: AssetAmount | ChainObject) {
        super(OperationType.AssetClaimFees, fee);
        this.issuer = issuer;
        this.uia = uia;
        this.dct = dct;
    }
}
