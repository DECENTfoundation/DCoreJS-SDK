import { deserialize, Expose, Transform, Type } from "class-transformer";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { KeyPart } from "./KeyPart";
import { PubKey } from "./PubKey";
import { Synopsis } from "./Synopsis";

export class Purchase {
    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
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

    @Transform((value: string[]) => value.map((id) => ChainObject.parse(id)), { toClassOnly: true })
    @Expose({ name: "seeders_answered" })
    public seedersAnswered: ChainObject[];

    @Expose({ name: "size" })
    public size: number;

    @Expose({ name: "rating" })
    public rating: number;

    @Expose({ name: "comment" })
    public comment: string;

    @Type(() => Date)
    @Expose({ name: "expiration_time" })
    public expiration: Date;

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

    @Type(() => Date)
    @Expose({ name: "expiration_or_delivery_time" })
    public deliveryExpiration: Date;

    @Expose({ name: "rated_or_commented" })
    public ratedOrCommented: boolean;

    @Type(() => Date)
    @Expose({ name: "created" })
    public created: Date;

    @Expose({ name: "region_code_from" })
    public regionFrom: number;
}
