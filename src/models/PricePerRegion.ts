import { Expose, Transform, Type } from "class-transformer";
import { AssetAmount } from "./AssetAmount";
import { RegionalPrice } from "./RegionalPrice";

export class PricePerRegion {
    @Type(() => RegionalPrice)
    @Transform((values: Array<[number, AssetAmount]>) => values.map(([region, amount]) => new RegionalPrice(amount, region)), { toClassOnly: true })
    @Expose({ name: "map_price" })
    public prices: RegionalPrice[];
}
