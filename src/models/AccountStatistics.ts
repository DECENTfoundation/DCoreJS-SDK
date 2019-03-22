import { Expose } from "class-transformer";
import * as Long from "long";
import { ChainObjectToClass, LongToClass } from "../utils/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class AccountStatistics {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @ChainObjectToClass
    @Expose({ name: "owner" })
    public owner: ChainObject;

    @ChainObjectToClass
    @Expose({ name: "most_recent_op" })
    public mostRecentOp: ChainObject;

    @LongToClass
    @Expose({ name: "total_ops" })
    public totalOps: Long;

    @LongToClass
    @Expose({ name: "total_core_in_orders" })
    public totalCoreInOrders: Long;

    @LongToClass
    @Expose({ name: "pending_fees" })
    public pendingFees: Long;

    @LongToClass
    @Expose({ name: "pending_vested_fees" })
    public pendingVestedFees: Long;

}
