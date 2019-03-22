import { Expose, Type } from "class-transformer";
import { AssetAmount } from "./AssetAmount";
import { Regions } from "./Regions";

export class RegionalPrice {

    @Type(() => AssetAmount)
    @Expose({ name: "price" })
    public price: AssetAmount;

    @Expose({ name: "region" })
    public region: number;

    constructor(price: AssetAmount, region: number = Regions.All) {
        this.price = price;
        this.region = region;
    }
}
