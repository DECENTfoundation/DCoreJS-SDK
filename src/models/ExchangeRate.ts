import { Expose, Type } from "class-transformer";
import { AssetAmount } from "./AssetAmount";

export class ExchangeRate {

    @Type(() => AssetAmount)
    @Expose({ name: "base" })
    public base: AssetAmount;

    @Type(() => AssetAmount)
    @Expose({ name: "quote" })
    public quote: AssetAmount;

    // create DCT
    /*
        constructor(assetId: ChainObject) {
            this.base = new AssetAmount(Long.ONE, assetId);
            this.quote = new AssetAmount(Long.ONE, assetId);
        }
    */
}
