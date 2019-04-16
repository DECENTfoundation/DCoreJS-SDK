import { Expose, Type } from "class-transformer";
import { AssetAmount } from "./AssetAmount";

export class ExchangeRate {

    @Type(() => AssetAmount)
    @Expose({ name: "base" })
    public base: AssetAmount;

    @Type(() => AssetAmount)
    @Expose({ name: "quote" })
    public quote: AssetAmount;
}
