import { Expose, Transform } from "class-transformer";
import * as Long from "long";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";

export class Statistics {

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "id" })
    public id: ChainObject;

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "id" })
    public owner: ChainObject;

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "most_recent_op" })
    public mostRecentOp: ChainObject;

    @Transform((value: string) => Long.fromValue(value), { toClassOnly: true })
    @Transform((value: object, obj: AssetAmount) => obj.amount.toString(), { toPlainOnly: true })
    @Expose({ name: "total_ops" })
    public totalOps: Long;

    @Transform((value: string) => Long.fromValue(value), { toClassOnly: true })
    @Transform((value: object, obj: AssetAmount) => obj.amount.toString(), { toPlainOnly: true })
    @Expose({ name: "total_core_in_orders" })
    public totalCoreInOrders: Long;

    @Transform((value: string) => Long.fromValue(value), { toClassOnly: true })
    @Transform((value: object, obj: AssetAmount) => obj.amount.toString(), { toPlainOnly: true })
    @Expose({ name: "pending_fees" })
    public pendingFees: Long;

    @Transform((value: string) => Long.fromValue(value), { toClassOnly: true })
    @Transform((value: object, obj: AssetAmount) => obj.amount.toString(), { toPlainOnly: true })
    @Expose({ name: "pending_vested_fees" })
    public pendingVestedFees: Long;

}
