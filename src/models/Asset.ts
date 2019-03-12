import { Expose, Transform, Type } from "class-transformer";
import { Decimal } from "decimal.js";
import * as Long from "long";
import { DCoreConstants } from "../DCoreConstants";

import { assertThrow } from "../utils";

import { AssetAmount } from "./AssetAmount";
import { AssetOptions } from "./AssetOptions";
import { ChainObject } from "./ChainObject";
import { UnsupportedAssetError } from "./error/UnsupportedAssetError";

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

    public convertFromDCT(amount: Long | number, roundingMode: Decimal.Rounding = Decimal.ROUND_CEIL) {
        return this.convert(typeof amount === "number" ? Long.fromNumber(amount) : amount, this.id, roundingMode);
    }

    public convertToDCT(amount: Long | number, roundingMode: Decimal.Rounding = Decimal.ROUND_CEIL) {
        return this.convert(typeof amount === "number" ? Long.fromNumber(amount) : amount, DCoreConstants.DCT_ASSET_ID, roundingMode);
    }

    private convert(amount: Long, toAssetId: ChainObject, rounding: Decimal.Rounding): AssetAmount {
        if (!this.options.exchangeable) {
            throw new UnsupportedAssetError("Converting is available only for exchangeable assets");
        }

        const quote = new Decimal(this.options.exchangeRate.quote.amount.toString());
        const base = new Decimal(this.options.exchangeRate.base.amount.toString());
        // const amount = new Decimal(assetAmount.amount.toString());

        assertThrow(quote.greaterThan(0), () => "Quote exchange amount must be greater then 0");
        assertThrow(base.greaterThan(0), () => "Base exchange amount must be greater then 0");

        if (this.options.exchangeRate.base.assetId.eq(toAssetId)) {
            const result = quote.div(base).mul(amount.toString());
            return new AssetAmount(Long.fromString(result.toFixed(0, rounding)), toAssetId);
        }

        if (this.options.exchangeRate.quote.assetId.eq(toAssetId)) {
            const result = base.div(quote).mul(amount.toString());
            return new AssetAmount(Long.fromString(result.toFixed(0, rounding)), toAssetId);
        }

        assertThrow(false, () => `cannot convert ${toAssetId} with ${this.symbol}:${this.id}`);
    }
}
