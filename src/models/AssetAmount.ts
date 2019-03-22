import { Expose } from "class-transformer";
import * as Long from "long";
import { DCoreConstants } from "../DCoreConstants";
import { ChainObjectToClass, ChainObjectToPlain, LongToClass, LongToPlain } from "../utils/TypeAdapters";
import { assertThrow } from "../utils/Utils";
import { ChainObject } from "./ChainObject";
import { ObjectType } from "./ObjectType";

export class AssetAmount {

    @LongToClass
    @LongToPlain
    @Expose({ name: "amount" })
    public amount: Long;

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "asset_id" })
    public assetId: ChainObject;

    constructor(amount: Long | number | string = Long.ZERO, assetId: ChainObject = DCoreConstants.DCT_ASSET_ID) {
        this.amount = Long.fromValue(amount).toUnsigned();
        this.assetId = assetId;

        assertThrow(this.amount >= Long.ZERO, () => "amount must be greater or equal to 0");
        assertThrow(this.assetId.objectType === ObjectType.Asset, () => "object id is not an asset");
    }
}
