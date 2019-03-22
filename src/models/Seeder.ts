// todo untested model
import { Expose, Type } from "class-transformer";
import * as Long from "long";
import { Moment } from "moment";
import { ChainObjectToClass, LongToClass, MomentToClass } from "../utils/TypeAdapters";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { PubKey } from "./PubKey";

export class Seeder {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @LongToClass
    @Expose({ name: "free_space" })
    public freeSpace: Long;

    @Type(() => AssetAmount)
    @Expose({ name: "price" })
    public price: AssetAmount;

    @MomentToClass
    @Expose({ name: "expiration" })
    public expiration: Moment;

    @Type(() => PubKey)
    @Expose({ name: "pubKey" })
    public pubKey: PubKey;

    @Expose({ name: "ipfs_ID" })
    public ipfsId: string;

    @ChainObjectToClass
    @Expose({ name: "stats" })
    public stats: ChainObject;

    @Expose({ name: "rating" })
    public rating: number;

    @Expose({ name: "region_code" })
    public regionCode: string;
}
