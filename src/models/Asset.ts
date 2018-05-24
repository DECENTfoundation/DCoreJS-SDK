import { Expose, Type } from "class-transformer";
import { ChainObject } from "./ChainObject";

export class Asset {

    @Type(() => ChainObject)
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "symbol" })
    public symbol: string;

    @Expose({ name: "precision" })
    public precision: number;

    @Expose({ name: "description" })
    public description: string;
}
