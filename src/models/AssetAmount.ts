import { Expose, Transform, Type } from "class-transformer";
import { ChainObject } from "./ChainObject";

export class AssetAmount {

    @Expose({ name: "amount" })
    public amount: number;

    @Type(() => ChainObject)
    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "asset_id" })
    public assetId: ChainObject;

    constructor(
        amount: number, assetId?: ChainObject,
    ) {
        this.amount = amount;
        this.assetId = assetId;
    }
}
