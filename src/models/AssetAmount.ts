import { Expose, Transform } from "class-transformer";
import * as Long from "long";
import { DCoreConstants } from "../DCoreConstants";
import { assertThrow } from "../utils/Utils";
import { ChainObject } from "./ChainObject";
import { ObjectType } from "./ObjectType";

export class AssetAmount {

    @Transform((value: string) => Long.fromValue(value), { toClassOnly: true })
    @Transform((value: object, obj: AssetAmount) => obj.amount.toString(), { toPlainOnly: true })
    @Expose({ name: "amount" })
    public amount: Long;

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "asset_id" })
    public assetId: ChainObject;

    constructor(amount: Long | number | string = Long.ZERO, assetId: ChainObject = DCoreConstants.DCT_ASSET_ID) {
        this.amount = Long.fromValue(amount);
        this.assetId = assetId;

        assertThrow(this.amount >= Long.ZERO, () => "amount must be greater or equal to 0");
        assertThrow(this.assetId.objectType === ObjectType.Asset, () => "object id is not an asset");
    }
}
