import { Expose } from "class-transformer";
import * as Long from "long";
import { ChainObjectToClass, ChainObjectToPlain, LongToClass, LongToClassSigned, LongToPlain } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class AccountStatistics {

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
    @Expose({ name: "most_recent_op" })
    public mostRecentOp: ChainObject;

    @LongToPlain
    @LongToClass
    @Expose({ name: "total_ops" })
    public totalOps: Long;

    // Int64
    @LongToPlain
    @LongToClassSigned
    @Expose({ name: "total_core_in_orders" })
    public totalCoreInOrders: Long;

    // Int64
    @LongToPlain
    @LongToClassSigned
    @Expose({ name: "pending_fees" })
    public pendingFees: Long;

    // Int64
    @LongToPlain
    @LongToClassSigned
    @Expose({ name: "pending_vested_fees" })
    public pendingVestedFees: Long;

}
