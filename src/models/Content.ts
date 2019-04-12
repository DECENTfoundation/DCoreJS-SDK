import { deserialize, Expose, Transform, Type } from "class-transformer";
import * as Long from "long";
import { Moment } from "moment";
import { ChainObjectToClass, CoAuthorsToClass, LongToClass, MomentToClass } from "../net/adapter/TypeAdapters";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { PricePerRegion } from "./PricePerRegion";
import { RegionalPrice } from "./RegionalPrice";
import { Synopsis } from "./Synopsis";

export class Content {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @CoAuthorsToClass
    @Expose({ name: "co_authors" })
    public coAuthors: Array<[ChainObject, number]>;

    @MomentToClass
    @Expose({ name: "expiration" })
    public expiration: Moment;

    @MomentToClass
    @Expose({ name: "created" })
    public created: Moment;

    @Type(() => PricePerRegion)
    @Expose({ name: "price" })
    public price: PricePerRegion;

    @LongToClass
    @Expose({ name: "size" })
    public size: Long;

    @Type(() => Synopsis)
    @Transform((value: string) => deserialize(Synopsis, value), { toClassOnly: true })
    @Expose({ name: "synopsis" })
    public synopsis: Synopsis;

    //    @Expose( { name: "status" })
    // public status: string;

    @Expose({ name: "URI" })
    public uri: string;

    @Expose({ name: "quorum" })
    public quorum: number;

    @Expose({ name: "key_parts" })
    public keyParts: object[];

    @Expose({ name: "_hash" })
    public hash: string;

    @Expose({ name: "last_proof" })
    public lastProof: object[];

    @Expose({ name: "is_blocked" })
    public isBlocked: boolean;

    @Expose({ name: "AVG_rating" })
    public rating: number;

    @Expose({ name: "num_of_ratings" })
    public ratings: number;

    @Expose({ name: "times_bought" })
    public timesBought: number;

    @Type(() => AssetAmount)
    @Expose({ name: "publishing_fee_escrow" })
    public publishingFeeEscrow: AssetAmount;

    @Expose({ name: "seeder_price" })
    public seederPrice: object[];

    /**
     * Get regional price for region or first defined
     *
     * @param forRegion
     * @return regional price
     */
    public regionalPrice(forRegion?: number): RegionalPrice {
        if (forRegion) {
            return new RegionalPrice(this.price.prices.get(forRegion)!, forRegion);
        } else {
            const [region, price] = this.price.prices.entries().next().value;
            return new RegionalPrice(price, region);
        }
    }
}
