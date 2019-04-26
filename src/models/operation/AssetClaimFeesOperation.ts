import { Expose, Type } from "class-transformer";
import { Fee } from "../../DCoreSdk";
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

    /**
     * Claim fees operation constructor. Claim funds from asset pool, only the asset issuer can clam.
     *
     * @param issuer account id issuing the asset
     * @param uia the uia asset value to claim
     * @param dct the dct asset value to claim
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    constructor(issuer: ChainObject, uia: AssetAmount, dct: AssetAmount, fee?: Fee) {
        super(OperationType.AssetClaimFees, fee);
        this.issuer = issuer;
        this.uia = uia;
        this.dct = dct;
    }
}
