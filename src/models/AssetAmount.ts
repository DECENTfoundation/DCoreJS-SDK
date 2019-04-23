import { Expose } from "class-transformer";
import * as Long from "long";
import { DCoreConstants } from "../DCoreConstants";
import { ChainObjectToClass, ChainObjectToPlain, LongToClass, LongToPlain } from "../net/adapter/TypeAdapters";
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

    /**
     * asset amount defines value and asset id
     *
     * @param amount raw value
     * @param assetId asset object id
     */
    constructor(amount: Long | number = Long.ZERO, assetId: ChainObject = DCoreConstants.DCT_ASSET_ID) {
        this.amount = Long.fromValue(amount).toUnsigned();
        this.assetId = assetId;

        assertThrow(this.amount >= Long.ZERO, () => "amount must be greater or equal to 0");
        assertThrow(this.assetId.objectType === ObjectType.Asset, () => "object id is not an asset");
    }
}
