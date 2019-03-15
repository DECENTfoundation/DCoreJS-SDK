import { Expose, Type } from "class-transformer";
import { Decimal } from "decimal.js";
import * as Long from "long";
import { DCoreConstants } from "../DCoreConstants";

import { assertThrow } from "../utils";
import { ChainObjectToClass } from "../utils/TypeAdapters";

import { AssetAmount } from "./AssetAmount";
import { AssetOptions } from "./AssetOptions";
import { ChainObject } from "./ChainObject";
import { UnsupportedAssetError } from "./error/UnsupportedAssetError";

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

    public convert(assetAmount: AssetAmount, rounding: Decimal.Rounding = Decimal.ROUND_CEIL): AssetAmount {
        if (!(this.id.eq(DCoreConstants.DCT_ASSET_ID) || assetAmount.assetId.eq(DCoreConstants.DCT_ASSET_ID))) {
            throw new UnsupportedAssetError("One of converted asset must be DCT, conversions between arbitrary assets is not supported");
        }

        if (!this.options.exchangeable) {
            throw new UnsupportedAssetError("Converting is available only for exchangeable assets");
        }
        const quote = new Decimal(this.options.exchangeRate.quote.amount.toString());
        const base = new Decimal(this.options.exchangeRate.base.amount.toString());
        const amount = new Decimal(assetAmount.amount.toString());

        if (this.options.exchangeRate.base.assetId.eq(assetAmount.assetId)) {
            const result = quote.div(base).mul(amount);
            return new AssetAmount(Long.fromString(result.toFixed(0, rounding)), this.id);
        }

        if (this.options.exchangeRate.quote.assetId.eq(assetAmount.assetId)) {
            const result = base.div(quote).mul(amount);
            return new AssetAmount(Long.fromString(result.toFixed(0, rounding)), this.id);
        }

        assertThrow(false, () => `cannot convert ${assetAmount.assetId} with ${this.symbol}:${this.id}`);
    }
}
