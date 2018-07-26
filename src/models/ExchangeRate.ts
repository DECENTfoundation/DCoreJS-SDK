import { Expose } from "class-transformer";
import { AssetAmount } from "./AssetAmount";

export class ExchangeRate {

    @Expose({ name: "base" })
    public base: AssetAmount;

    @Expose({ name: "quote" })
    public quote: AssetAmount;

    constructor(base: AssetAmount = new AssetAmount(1), quote: AssetAmount = new AssetAmount(1)) {
        this.base = base;
        this.quote = quote;
    }
}
