import { Expose, Type } from "class-transformer";
import { Fee } from "../../DCoreClient";
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

    /**
     * Reserve funds operation constructor. Return issued funds to the issuer of the asset.
     *
     * @param payer account id providing the funds
     * @param amount asset amount to remove from current supply
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    constructor(payer: ChainObject, amount: AssetAmount, fee?: Fee) {
        super(OperationType.AssetReserve, fee);
        this.payer = payer;
        this.amount = amount;
    }
}
