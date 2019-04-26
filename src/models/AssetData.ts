import { Expose, Transform } from "class-transformer";
import * as Long from "long";
import { ChainObject } from "./ChainObject";

export class AssetData {

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "id" })
    public id: ChainObject;

    @Transform((value: string | number) => Long.fromValue(value), { toClassOnly: true })
    @Expose({ name: "current_supply" })
    public currentSupply: Long;

    @Transform((value: string | number) => Long.fromValue(value), { toClassOnly: true })
    @Expose({ name: "asset_pool" })
    public assetPool: Long;

    @Transform((value: string | number) => Long.fromValue(value), { toClassOnly: true })
    @Expose({ name: "core_pool" })
    public corePool: Long;

}
