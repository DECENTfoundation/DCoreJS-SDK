import { Expose } from "class-transformer";
import * as Long from "long";
import { ChainObjectToClass, LongToClass, LongToClassSigned } from "../net/adapter/TypeAdapters";
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

    // Int64
    @LongToClassSigned
    @Expose({ name: "total_core_in_orders" })
    public totalCoreInOrders: Long;

    // Int64
    @LongToClassSigned
    @Expose({ name: "pending_fees" })
    public pendingFees: Long;

    // Int64
    @LongToClassSigned
    @Expose({ name: "pending_vested_fees" })
    public pendingVestedFees: Long;

}
