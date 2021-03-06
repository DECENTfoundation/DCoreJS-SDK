import Decimal from "decimal.js";
import * as Long from "long";
import { AssetPrecision } from "../DCoreClient";
import { DCoreConstants } from "../DCoreConstants";
import { Asset } from "./Asset";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";

/**
 * Asset formatting/parsing defined by decimal precision and a symbol for/from string representation.
 */
export class AssetFormatter {

    public static DCT: AssetFormatter = new AssetFormatter(DCoreConstants.DCT_ASSET_ID, DCoreConstants.DCT_ASSET_SYMBOL, 8);

    public static with(asset: Asset): AssetFormatter {
        return new AssetFormatter(asset.id, asset.symbol, asset.precision);
    }

    public id: ChainObject;
    public symbol: string;
    public precision: AssetPrecision;
    private readonly exp: Decimal;

    constructor(id: ChainObject, symbol: string, precision: AssetPrecision) {
        this.id = id;
        this.symbol = symbol;
        this.precision = precision;
        this.exp = new Decimal(10).pow(this.precision);
    }

    /**
     * Decimal number formatter.
     *
     * @param value new formatter function
     */
    public defaultFormat: (n: Decimal) => string = (value) => value.toDecimalPlaces(this.precision, Decimal.ROUND_DOWN).toString();

    /**
     * Get asset unit value, eg. 100000000 = 1DCT
     *
     * @param value raw value
     *
     * @return asset unit decimal value according to precision
     */
    public fromRaw(value: Long): Decimal {
        return new Decimal(value.toString()).dividedBy(this.exp);
    }

    /**
     * Get raw value, eg. 1DCT = 100000000
     *
     * @param value asset unit decimal value
     *
     * @return raw value
     */
    public toRaw(value: Decimal): Long {
        return Long.fromString(value.mul(this.exp).toString());
    }

    /**
     * Get asset amount value, eg. 100000000 = 1DCT
     *
     * @param value asset unit value
     *
     * @return asset amount value according to precision
     */
    public amount(value: string | number | Decimal): AssetAmount {
        return new AssetAmount(this.toRaw(new Decimal(value)), this.id);
    }

    /**
     * format raw value with asset symbol
     *
     * @param value raw value
     * @param formatter formatter to use for numeral value
     *
     * @return asset formatted string
     */
    public format(value: Long, formatter?: (n: Decimal) => string): string;

    /**
     * Format asset unit value with asset symbol
     *
     * @param value asset unit value
     * @param formatter formatter to use for numeral value
     *
     * @return asset formatted string
     */
    // tslint:disable-next-line:unified-signatures
    public format(value: Decimal, formatter?: (n: Decimal) => string): string;

    public format(value: Decimal | Long, formatter: (n: Decimal) => string = this.defaultFormat): string {
        if (value instanceof Long) {
            return `${formatter(this.fromRaw(value))} ${this.symbol}`;
        }
        if (value instanceof Decimal) {
            return `${formatter(value)} ${this.symbol}`;
        }
        throw TypeError("not a valid amount");
    }
}
