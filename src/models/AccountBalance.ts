import { Expose } from "class-transformer";
import * as Long from "long";
import { ChainObjectToClass, ChainObjectToPlain, LongToClass, LongToPlain } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class AccountBalance {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "owner" })
    public owner: ChainObject;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "asset_type" })
    public assetType: ChainObject;

    // Int64
    @LongToClass
    @LongToPlain
    @Expose({ name: "balance" })
    public balance: Long;

}
