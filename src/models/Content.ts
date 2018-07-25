import { deserialize, Expose, Transform, Type } from "class-transformer";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { PricePerRegion } from "./PricePerRegion";
import { Synopsis } from "./Synopsis";

export class Content {
    @Type(() => ChainObject)
    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "id" })
    public id: ChainObject;

    @Type(() => ChainObject)
    @Transform((value: string[]) => value.map((id) => ChainObject.parse(id)), { toClassOnly: true })
    @Transform((value: ChainObject[]) => value.map((id) => id.objectId), { toPlainOnly: true })
    @Expose({ name: "co_authors" })
    public coauthors: ChainObject[];

    @Type(() => Date)
    @Expose({ name: "expiration" })
    public expiration: Date;

    @Type(() => Date)
    @Expose({ name: "created" })
    public created: Date;

    @Type(() => PricePerRegion)
    @Expose({ name: "price" })
    public price: PricePerRegion;

    @Expose({ name: "size" })
    public size: number;

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
}
