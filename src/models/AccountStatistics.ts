import { Expose, Transform } from "class-transformer";
import * as Long from "long";
import { ChainObject } from "./ChainObject";

export class AccountStatistics {

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "id" })
    public id: ChainObject;

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "owner" })
    public owner: ChainObject;

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "most_recent_op" })
    public mostRecentOp: ChainObject;

    @Transform((value: string) => Long.fromValue(value), { toClassOnly: true })
    @Expose({ name: "total_ops" })
    public totalOps: Long;

    @Transform((value: string) => Long.fromValue(value), { toClassOnly: true })
    @Expose({ name: "total_core_in_orders" })
    public totalCoreInOrders: Long;

    @Transform((value: string) => Long.fromValue(value), { toClassOnly: true })
    @Expose({ name: "pending_fees" })
    public pendingFees: Long;

    @Transform((value: string) => Long.fromValue(value), { toClassOnly: true })
    @Expose({ name: "pending_vested_fees" })
    public pendingVestedFees: Long;

}
