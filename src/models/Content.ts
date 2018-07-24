import { Expose, Type } from "class-transformer";
import { ChainObject } from "./ChainObject";
import { PricePerRegion } from "./PricePerRegion";
import { Synopsis } from "./Synopsis";

export class Content {
    @Type(() => ChainObject)
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "author" })
    public author: string;

    @Type(() => PricePerRegion)
    @Expose({ name: "price" })
    public price: PricePerRegion;

    @Type(() => Synopsis)
    @Expose({ name: "synopsis" })
    public synopsis: Synopsis;

    //    @Expose( { name: "status" })
    // public status: string;

    @Expose({ name: "URI" })
    public uri: string;

    @Expose({ name: "_hash" })
    public hash: string;

    @Expose({ name: "AVG_rating" })
    public rating: string;

    @Expose({ name: "size" })
    public size: number;

    @Type(() => Date)
    @Expose({ name: "expiration" })
    public expiration: Date;

    @Type(() => Date)
    @Expose({ name: "created" })
    public created: Date;

    @Expose({ name: "times_bought" })
    public timesBought: number;
}
