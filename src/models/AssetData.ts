import { Expose } from "class-transformer";
import * as Long from "long";
import { ChainObjectToClass, ChainObjectToPlain, LongToClass, LongToPlain } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class AssetData {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    // Int64
    @LongToPlain
    @LongToClass
    @Expose({ name: "current_supply" })
    public currentSupply: Long;

    // Int64
    @LongToPlain
    @LongToClass
    @Expose({ name: "asset_pool" })
    public assetPool: Long;

    // Int64
    @LongToPlain
    @LongToClass
    @Expose({ name: "core_pool" })
    public corePool: Long;

}
