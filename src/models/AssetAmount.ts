import { Expose, Type } from "class-transformer";
import { ChainObject } from "./ChainObject";

export class AssetAmount {

    @Expose({ name: "amount" })
    public amount: number;

    @Type(() => ChainObject)
    @Expose({ name: "asset_id" })
    public assetId: ChainObject;

    constructor(
        amount: number, assetId?: ChainObject,
    ) {
        this.amount = amount;
        this.assetId = assetId;
    }
}
