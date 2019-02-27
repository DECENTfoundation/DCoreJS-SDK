import { Expose, Transform, Type } from "class-transformer";
import { Decimal } from "decimal.js";
import * as Long from "long";

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
        const quote = new Decimal(this.options.exchangeRate.quote.amount.toString());
        const base = new Decimal(this.options.exchangeRate.base.amount.toString());
        const amount = new Decimal(assetAmount.amount.toString());

        if (this.options.exchangeRate.base.assetId.eq(assetAmount.assetId)) {
            const result = quote.div(base).mul(amount);
            return new AssetAmount(Long.fromString(result.toFixed(0)), this.id);
        }

        if (this.options.exchangeRate.quote.assetId.eq(assetAmount.assetId)) {
            const result = base.div(quote).mul(amount);
            return new AssetAmount(Long.fromString(result.toFixed(0)), this.id);
        }

        assertThrow(false, () => `cannot convert ${assetAmount.assetId} with ${this.symbol}:${this.id}`);
    }
}
