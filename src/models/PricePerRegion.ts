import { Expose, plainToClass, Transform } from "class-transformer";
import { RegionalPrice } from "./RegionalPrice";

export class PricePerRegion {
    // tslint:disable-next-line:max-line-length
    @Transform((values: Array<[number, any]>) => values.map(([region, price]) => plainToClass(RegionalPrice, { region, price })), { toClassOnly: true })
    @Expose({ name: "map_price" })
    public prices: RegionalPrice[];
}
