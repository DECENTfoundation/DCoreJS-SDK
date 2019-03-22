import { Expose, Type } from "class-transformer";
import { Decimal } from "decimal.js";
import * as Long from "long";
import { DCoreConstants } from "../DCoreConstants";
import { ChainObjectToClass } from "../utils/TypeAdapters";
import { assertThrow } from "../utils/Utils";
import { AssetAmount } from "./AssetAmount";
import { AssetOptions } from "./AssetOptions";
import { ChainObject } from "./ChainObject";
import { IllegalArgumentError } from "./error/IllegalArgumentError";

export class Asset {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "symbol" })
    public symbol: string;

    @Expose({ name: "precision" })
    public precision: number;

    @ChainObjectToClass
    @Expose({ name: "issuer" })
    public issuer: ChainObject;

    @Expose({ name: "description" })
    public description: string;

    @Type(() => AssetOptions)
    @Expose({ name: "options" })
    public options: AssetOptions;

    @ChainObjectToClass
    @Expose({ name: "dynamic_asset_data_id" })
    public dynamicAssetDataId: ChainObject;

    /**
     * Convert amount in DCT to this asset
     *
     * @param amount amount to convert
     * @param roundingMode rounding mode to use when rounding to target asset precision
     */
    public convertFromDCT(amount: Long | number, roundingMode: Decimal.Rounding = Decimal.ROUND_CEIL) {
        return this.convert(typeof amount === "number" ? Long.fromNumber(amount) : amount, this.id, roundingMode);
    }

    /**
     * Convert amount in this asset to DCT
     *
     * @param amount amount to convert
     * @param roundingMode rounding mode to use when rounding to target asset precision
     */
    public convertToDCT(amount: Long | number, roundingMode: Decimal.Rounding = Decimal.ROUND_CEIL) {
        return this.convert(typeof amount === "number" ? Long.fromNumber(amount) : amount, DCoreConstants.DCT_ASSET_ID, roundingMode);
    }

    private convert(amount: Long, toAssetId: ChainObject, rounding: Decimal.Rounding): AssetAmount {
        const quote = new Decimal(this.options.exchangeRate.quote.amount.toString());
        const base = new Decimal(this.options.exchangeRate.base.amount.toString());

        assertThrow(quote.greaterThan(0), () => "Quote exchange amount must be greater then 0");
        assertThrow(base.greaterThan(0), () => "Base exchange amount must be greater then 0");

        if (this.options.exchangeRate.base.assetId.eq(toAssetId)) {
            const result = quote.mul(amount.toString()).div(base);
            return new AssetAmount(Long.fromString(result.toFixed(0, rounding)), toAssetId);
        }

        if (this.options.exchangeRate.quote.assetId.eq(toAssetId)) {
            const result = base.mul(amount.toString()).div(quote);
            return new AssetAmount(Long.fromString(result.toFixed(0, rounding)), toAssetId);
        }

        throw new IllegalArgumentError(`cannot convert ${toAssetId} with ${this.symbol}:${this.id}`);
    }
}
