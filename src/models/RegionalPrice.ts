import { Expose, Type } from "class-transformer";
import { AssetAmount } from "./AssetAmount";

export class RegionalPrice {
    public static NONE = 1;

    @Type(() => AssetAmount)
    @Expose({ name: "price" })
    public price: AssetAmount;

    @Expose({ name: "region" })
    public region: number;

    constructor(price: AssetAmount, region: number = RegionalPrice.NONE) {
        this.price = price;
        this.region = region;
    }
}
