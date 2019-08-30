import { Expose } from "class-transformer";
import { AssetPrecision, Fee } from "../../DCoreClient";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { Asset } from "../Asset";
import { ChainObject } from "../ChainObject";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class AssetUpdateAdvancedOperation extends BaseOperation {

    public static create(asset: Asset): AssetUpdateAdvancedOperation {
        return new AssetUpdateAdvancedOperation(asset.issuer, asset.id, asset.precision, asset.options.isFixedMaxSupply);
    }

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "issuer" })
    public issuer: ChainObject;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "asset_to_update" })
    public assetToUpdate: ChainObject;

    // UInt8
    @Expose({ name: "new_precision" })
    public precision: number;

    @Expose({ name: "set_fixed_max_supply" })
    public fixedMaxSupply: boolean;

    /**
     * Update advanced options for the asset.
     *
     * @param issuer account id issuing the asset
     * @param assetToUpdate asset to update
     * @param precision new precision
     * @param fixedMaxSupply whether it should be allowed to change max supply, cannot be reverted once set to true
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    constructor(
        issuer: ChainObject,
        assetToUpdate: ChainObject,
        precision: AssetPrecision,
        fixedMaxSupply?: boolean,
        fee?: Fee,
    ) {
        super(OperationType.UpdateUserIssuedAssetAdvanced, fee);
        this.issuer = issuer;
        this.assetToUpdate = assetToUpdate;
        this.precision = precision;
        this.fixedMaxSupply = fixedMaxSupply ? fixedMaxSupply : false;
    }
}
