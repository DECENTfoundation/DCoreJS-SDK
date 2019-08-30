import { Expose, Type } from "class-transformer";
import { Fee } from "../../DCoreClient";
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

    /**
     * Fund asset pool operation constructor. Any account can fund a pool.
     *
     * @param from account id funding the pool
     * @param uia the uia asset value to fund
     * @param dct the dct asset value to fund
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    constructor(from: ChainObject, uia: AssetAmount, dct: AssetAmount, fee?: Fee) {
        super(OperationType.AssetFundPools, fee);
        this.from = from;
        this.uia = uia;
        this.dct = dct;
    }

}
