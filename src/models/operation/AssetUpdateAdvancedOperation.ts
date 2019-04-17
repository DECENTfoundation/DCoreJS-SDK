import { Expose } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { Asset } from "../Asset";
import { AssetAmount } from "../AssetAmount";
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

    @Expose({ name: "new_precision" })
    public precision: number;

    @Expose({ name: "set_fixed_max_supply" })
    public fixedMaxSupply: boolean;

    constructor(
        issuer: ChainObject,
        assetToUpdate: ChainObject,
        precision: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
        fixedMaxSupply?: boolean,
        fee?: AssetAmount | ChainObject,
    ) {
        super(OperationType.UpdateUserIssuedAssetAdvanced, fee);
        this.issuer = issuer;
        this.assetToUpdate = assetToUpdate;
        this.precision = precision;
        this.fixedMaxSupply = fixedMaxSupply ? fixedMaxSupply : false;
    }
}
