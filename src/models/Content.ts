import { classToPlain, deserialize, Expose, plainToClass, serialize, Transform, Type } from "class-transformer";
import * as Long from "long";
import * as moment from "moment";
import { Moment } from "moment";
import {
    ChainObjectToClass,
    ChainObjectToPlain,
    CoAuthorsToClass,
    CoAuthorsToPlain,
    LongToClass,
    LongToPlain,
    MomentToClass,
    MomentToPlain,
    TypeAdapters,
} from "../net/adapter/TypeAdapters";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { CustodyData } from "./CustodyData";
import { KeyPart } from "./KeyPart";
import { PricePerRegion } from "./PricePerRegion";
import { RegionalPrice } from "./RegionalPrice";
import { Synopsis } from "./Synopsis";

export class Content {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "author" })
    public author: ChainObject;

    // UInt32
    @CoAuthorsToPlain
    @CoAuthorsToClass
    @Expose({ name: "co_authors" })
    public coAuthors: Array<[ChainObject, number]>;

    @MomentToPlain
    @MomentToClass
    @Expose({ name: "expiration" })
    public expiration: Moment;

    @MomentToPlain
    @MomentToClass
    @Expose({ name: "created" })
    public created: Moment;

    @Type(() => PricePerRegion)
    @Expose({ name: "price" })
    public price: PricePerRegion;

    @Transform((value: Synopsis) => serialize(value), { toPlainOnly: true })
    @Transform((value: string) => deserialize(Synopsis, value), { toClassOnly: true })
    @Expose({ name: "synopsis" })
    public synopsis: Synopsis;

    // UInt64
    @LongToPlain
    @LongToClass
    @Expose({ name: "size" })
    public size: Long;

    // UInt32
    @Expose({ name: "quorum" })
    public quorum: number;

    @Expose({ name: "URI" })
    public uri: string;

    @Transform((val: any, obj: Content) =>
        Array.from(obj.keyParts).map((it) => [it[0].objectId, classToPlain(it[1])]), { toPlainOnly: true })
    @Transform((values: Array<[string, object]>) =>
        new Map(values.map(([id, keyPart]) => [ChainObject.parse(id), plainToClass(KeyPart, keyPart)])), { toClassOnly: true })
    @Expose({ name: "key_parts" })
    public keyParts: Map<ChainObject, KeyPart>;

    @Transform((val: any, obj: Content) =>
        Array.from(obj.lastProof).map((it) => [it[0].objectId, it[1].utc().format(TypeAdapters.TIMESTAMP_FORMAT)]), { toPlainOnly: true })
    @Transform((values: Array<[string, string]>) =>
        new Map(values.map(([id, timeSec]) => [ChainObject.parse(id), moment.utc(timeSec)])), { toClassOnly: true })
    @Expose({ name: "last_proof" })
    public lastProof: Map<ChainObject, Moment>;

    // Int64
    @Transform((val: any, obj: Content) =>
        Array.from(obj.seederPrice).map((it) => [it[0].objectId, it[1].toString()]), { toPlainOnly: true })
    @Transform((values: Array<[string, string | number]>) =>
        new Map(values.map(([id, amount]) => [ChainObject.parse(id), Long.fromValue(amount)])), { toClassOnly: true })
    @Expose({ name: "seeder_price" })
    public seederPrice: Map<ChainObject, Long>;

    @Expose({ name: "is_blocked" })
    public isBlocked: boolean;

    @Expose({ name: "_hash" })
    public hash: string;

    // UInt64
    @LongToPlain
    @LongToClass
    @Expose({ name: "AVG_rating" })
    public rating: Long;

    // UInt32
    @Expose({ name: "num_of_ratings" })
    public ratings: number;

    // UInt32
    @Expose({ name: "times_bought" })
    public timesBought: number;

    @Type(() => AssetAmount)
    @Expose({ name: "publishing_fee_escrow" })
    public publishingFeeEscrow: AssetAmount;

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
