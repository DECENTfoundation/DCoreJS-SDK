import { Expose, Type } from "class-transformer";
import { AssetAmount } from "./AssetAmount";

export class PricePerRegion {
    @Type(() => Map)
    @Expose({ name: "map_price" })
    public prices: Map<number, AssetAmount>;
}
