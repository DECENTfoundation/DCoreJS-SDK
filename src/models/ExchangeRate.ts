import { Expose, Type } from "class-transformer";
import * as Long from "long";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";

export class ExchangeRate {

    public static empty(): ExchangeRate {
        return new ExchangeRate(new AssetAmount(0), new AssetAmount(0));
    }

    // quote & base asset ids cannot be the same, for quote any id can be used since it is modified to created asset id upon creation
    public static forCreateOp(base: Long | number, quote: Long | number): ExchangeRate {
        return new ExchangeRate(new AssetAmount(base), new AssetAmount(quote, ChainObject.parse("1.3.1")));
    }

    public static forUpdateOp(base: Long | number, quote: Long | number, assetToUpdate: ChainObject): ExchangeRate {
        return new ExchangeRate(new AssetAmount(base), new AssetAmount(quote, assetToUpdate));
    }

    @Type(() => AssetAmount)
    @Expose({ name: "base" })
    public base: AssetAmount;

    @Type(() => AssetAmount)
    @Expose({ name: "quote" })
    public quote: AssetAmount;

    constructor(base: AssetAmount, quote: AssetAmount) {
        this.base = base;
        this.quote = quote;
    }
}
