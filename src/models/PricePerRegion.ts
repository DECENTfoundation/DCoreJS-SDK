import { Expose, plainToClass, Transform } from "class-transformer";
import { AssetAmount } from "./AssetAmount";
import { Regions } from "./Regions";

export class PricePerRegion {
    @Transform((values: Array<[number, object]>) => new Map(values.map(([region, price]) =>
        [region, plainToClass(AssetAmount, price)] as [Regions, AssetAmount])), { toClassOnly: true })
    @Expose({ name: "map_price" })
    public prices: Map<Regions, AssetAmount>;
}
