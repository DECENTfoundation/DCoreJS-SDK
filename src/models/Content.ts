import { Expose } from "class-transformer";

import { ChainObject } from "./ChainObject";

export class Content<T> {

    public id: ChainObject;
    public author: string;
    public price: PricePerRegion;
    public synopsis: T;
    public status: string;
    public hash: string;
    public size: number;
    public expiration: Date;
    public created: Date;

    @Expose({ name: "URI" })
    public uri: string;

    @Expose({ name: "AVG_rating" })
    public rating: string;

    @Expose({ name: "times_bought" })
    public timesBought: number;
}
