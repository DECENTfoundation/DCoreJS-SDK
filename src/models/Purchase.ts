import { deserialize, Expose, Transform, Type } from "class-transformer";
import * as Long from "long";
import { Moment } from "moment";
import { ChainObjectArrayToClass, ChainObjectToClass, LongToClass, MomentToClass } from "../utils/TypeAdapters";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { KeyPart } from "./KeyPart";
import { PubKey } from "./PubKey";
import { Synopsis } from "./Synopsis";

export class Purchase {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "consumer" })
    public author: string;

    @Expose({ name: "URI" })
    public uri: string;

    @Type(() => Synopsis)
    @Transform((value: string) => deserialize(Synopsis, value), { toClassOnly: true })
    @Expose({ name: "synopsis" })
    public synopsis: Synopsis;

    @Type(() => AssetAmount)
    @Expose({ name: "price" })
    public price: AssetAmount;

    @Type(() => AssetAmount)
    @Expose({ name: "paid_price_before_exchange" })
    public priceBefore: AssetAmount;

    @Type(() => AssetAmount)
    @Expose({ name: "paid_price_after_exchange" })
    public priceAfter: AssetAmount;

    @ChainObjectArrayToClass
    @Expose({ name: "seeders_answered" })
    public seedersAnswered: ChainObject[];

    @LongToClass
    @Expose({ name: "size" })
    public size: Long;

    @Expose({ name: "rating" })
    public rating: number;

    @Expose({ name: "comment" })
    public comment: string;

    @MomentToClass
    @Expose({ name: "expiration_time" })
    public expiration: Moment;

    @Type(() => PubKey)
    @Expose({ name: "pubKey" })
    public pubElGamalKey: PubKey;

    @Type(() => KeyPart)
    @Expose({ name: "key_particles" })
    public keyParticles: KeyPart[];

    @Expose({ name: "expired" })
    public expired: boolean;

    @Expose({ name: "delivered" })
    public delivered: boolean;

    @MomentToClass
    @Expose({ name: "expiration_or_delivery_time" })
    public deliveryExpiration: Moment;

    @Expose({ name: "rated_or_commented" })
    public ratedOrCommented: boolean;

    @MomentToClass
    @Expose({ name: "created" })
    public created: Moment;

    @Expose({ name: "region_code_from" })
    public regionFrom: number;
}
