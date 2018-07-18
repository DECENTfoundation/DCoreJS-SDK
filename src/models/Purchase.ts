import { Expose, Type } from "class-transformer";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { KeyParts } from "./KeyParts";
import { PubKey } from "./PubKey";

export class Purchase {
    @Type(() => ChainObject)
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "consumer" })
    public author: string;

    @Expose({ name: "URI" })
    public uri: string;

    @Expose({ name: "synopsis" })
    public synopsisJson: string;

    @Type(() => AssetAmount)
    @Expose({ name: "price" })
    public price: AssetAmount;

    @Type(() => AssetAmount)
    @Expose({ name: "paid_price_before_exchange" })
    public priceBefore: AssetAmount;

    @Type(() => AssetAmount)
    @Expose({ name: "paid_price_after_exchange" })
    public priceAfter: AssetAmount;

    @Type(() => ChainObject)
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

    @Type(() => KeyParts)
    @Expose({ name: "key_particles" })
    public keyParticles: KeyParts[];

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
