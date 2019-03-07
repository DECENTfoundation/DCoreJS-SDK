import { Expose } from "class-transformer";
import * as Long from "long";
import { ChainObject } from "./ChainObject";

export class AccountBalance {
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "owner" })
    public owner: ChainObject;

    @Expose({ name: "asset_type" })
    public assetType: ChainObject;

    @Expose({ name: "balance" })
    public balance: Long;

}
