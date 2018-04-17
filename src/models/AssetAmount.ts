import { Expose } from "class-transformer";

import { ChainObject } from "./ChainObject";

export class AssetAmount {

    public amount: number;

    @Expose({ name: "asset_id" })
    public assetId: ChainObject;

    constructor(
        amount: number, assetId?: ChainObject,
    ) {
        this.amount = amount;
        this.assetId = assetId;
    }
}
