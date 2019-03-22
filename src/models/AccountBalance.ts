import { Expose } from "class-transformer";
import * as Long from "long";
import { ChainObjectToClass, LongToClass } from "../utils/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class AccountBalance {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @ChainObjectToClass
    @Expose({ name: "owner" })
    public owner: ChainObject;

    @ChainObjectToClass
    @Expose({ name: "asset_type" })
    public assetType: ChainObject;

    @LongToClass
    @Expose({ name: "balance" })
    public balance: Long;

}
