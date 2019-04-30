import { deserialize, Expose, plainToClass, Transform, Type } from "class-transformer";
import * as Long from "long";
import * as moment from "moment";
import { Moment } from "moment";
import { ChainObjectToClass, CoAuthorsToClass, LongToClass, MomentToClass } from "../net/adapter/TypeAdapters";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { CustodyData } from "./CustodyData";
import { KeyPart } from "./KeyPart";
import { PricePerRegion } from "./PricePerRegion";
import { RegionalPrice } from "./RegionalPrice";
import { Synopsis } from "./Synopsis";

export class Content {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @ChainObjectToClass
    @Expose({ name: "author" })
    public author: ChainObject;

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

    @Transform((value: string) => deserialize(Synopsis, value), { toClassOnly: true })
    @Expose({ name: "synopsis" })
    public synopsis: Synopsis;

    //    @Expose( { name: "status" })
    // public status: string;

    @Expose({ name: "URI" })
    public uri: string;

    @Expose({ name: "quorum" })
    public quorum: number;

    @Transform((values: Array<[string, object]>) =>
        new Map(values.map(([id, keyPart]) => [ChainObject.parse(id), plainToClass(KeyPart, keyPart)])), { toClassOnly: true })
    @Expose({ name: "key_parts" })
    public keyParts: Map<ChainObject, KeyPart>;

    @Expose({ name: "_hash" })
    public hash: string;

    @Transform((values: Array<[string, string]>) =>
        new Map(values.map(([id, timeSec]) => [ChainObject.parse(id), moment.utc(timeSec)])), { toClassOnly: true })
    @Expose({ name: "last_proof" })
    public lastProof: Map<ChainObject, Moment>;

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

    @Transform((values: Array<[string, string | number]>) =>
        new Map(values.map(([id, amount]) => [ChainObject.parse(id), Long.fromValue(amount)])), { toClassOnly: true })
    @Expose({ name: "seeder_price" })
    public seederPrice: Map<ChainObject, Long>;

    @Type(() => CustodyData)
    @Expose({ name: "cd" })
    public custodyData: CustodyData;

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
