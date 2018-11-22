import { Expose, Transform, Type } from "class-transformer";

import { assertThrow } from "../utils";

import { AssetAmount } from "./AssetAmount";
import { AssetOptions } from "./AssetOptions";
import { ChainObject } from "./ChainObject";

export class Asset {

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "symbol" })
    public symbol: string;

    @Expose({ name: "precision" })
    public precision: number;

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "issuer" })
    public issuer: ChainObject;

    @Expose({ name: "description" })
    public description: string;

    @Type(() => AssetOptions)
    @Expose({ name: "options" })
    public options: AssetOptions;

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "dynamic_asset_data_id" })
    public dynamicAssetDataId: ChainObject;

    public convert(assetAmount: AssetAmount): AssetAmount {
        if (this.options.exchangeRate.base.assetId.eq(assetAmount.assetId)) {
            const amount = this.options.exchangeRate.quote.amount.div(this.options.exchangeRate.base.amount).mul(assetAmount.amount);
            return new AssetAmount(amount, this.id);
        }

        if (this.options.exchangeRate.quote.assetId.eq(assetAmount.assetId)) {
            const amount = this.options.exchangeRate.base.amount.div(this.options.exchangeRate.quote.amount).mul(assetAmount.amount);
            return new AssetAmount(amount, this.id);
        }

        assertThrow(false, () => `cannot convert ${assetAmount.assetId} with ${this.symbol}:${this.id}`);
    }
}
