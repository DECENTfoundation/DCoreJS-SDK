import { Expose, plainToClass, serialize, Transform } from "class-transformer";
import { AssetAmount } from "./AssetAmount";
import { RegionalPrice } from "./RegionalPrice";
import { Regions } from "./Regions";

export class PricePerRegion {
    @Transform(((value: any, obj: PricePerRegion) => Array.from(obj.prices).map((it) => [it[0], serialize(it[1])])))
    @Transform((values: Array<[number, object]>) => new Map(values.map(([region, price]) =>
        [region, plainToClass(AssetAmount, price)] as [Regions, AssetAmount])), { toClassOnly: true })
    @Expose({ name: "map_price" })
    public prices: Map<Regions, AssetAmount>;

    public get regionalPrices(): RegionalPrice[] {
        return Array.from(this.prices).map(([region, amount]) => new RegionalPrice(amount, region));
    }
}
