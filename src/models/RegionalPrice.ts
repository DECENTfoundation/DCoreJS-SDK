import { Expose, Type } from "class-transformer";
import { AssetAmount } from "./AssetAmount";

export class RegionalPrice {
    @Type(() => AssetAmount)
    @Expose({ name: "price" })
    public price: AssetAmount;

    @Expose({ name: "region" })
    public region: number;

    constructor(price: AssetAmount, region: number) {
        this.price = price;
        this.region = region;
    }
}
