// todo untested model
import { Expose, Type } from "class-transformer";
import * as Long from "long";
import { Moment } from "moment";
import { ChainObjectToClass, ChainObjectToPlain, LongToClass, LongToPlain, MomentToClass, MomentToPlain } from "../net/adapter/TypeAdapters";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { PubKey } from "./PubKey";

export class Seeder {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    // UInt64
    @LongToPlain
    @LongToClass
    @Expose({ name: "free_space" })
    public freeSpace: Long;

    @Type(() => AssetAmount)
    @Expose({ name: "price" })
    public price: AssetAmount;

    @MomentToPlain
    @MomentToClass
    @Expose({ name: "expiration" })
    public expiration: Moment;

    @Type(() => PubKey)
    @Expose({ name: "pubKey" })
    public pubKey: PubKey;

    @Expose({ name: "ipfs_ID" })
    public ipfsId: string;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "stats" })
    public stats: ChainObject;

    // UInt32
    @Expose({ name: "rating" })
    public rating: number;

    @Expose({ name: "region_code" })
    public regionCode: string;
}
