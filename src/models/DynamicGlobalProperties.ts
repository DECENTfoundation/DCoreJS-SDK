import { BigInteger } from "big-integer";
import { Expose } from "class-transformer";
import * as Long from "long";
import { Moment } from "moment";
import { BigIntToClass, ChainObjectToClass, LongToClass, LongToClassSigned, MomentToClass } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class DynamicGlobalProperties {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    // UInt32
    @Expose({ name: "head_block_number" })
    public headBlockNumber: number;

    @Expose({ name: "head_block_id" })
    public headBlockId: string;

    @MomentToClass
    @Expose({ name: "time" })
    public time: Moment;

    @ChainObjectToClass
    @Expose({ name: "current_miner" })
    public currentMiner: ChainObject;

    @MomentToClass
    @Expose({ name: "next_maintenance_time" })
    public nextMaintenanceTime: Moment;

    @MomentToClass
    @Expose({ name: "last_budget_time" })
    public lastBudgetTime: Moment;

    // Int64
    @LongToClassSigned
    @Expose({ name: "unspent_fee_budget" })
    public unspentFeeBudget: Long;

    // Int64
    @LongToClassSigned
    @Expose({ name: "mined_rewards" })
    public minedRewards: Long;

    // Int64
    @LongToClassSigned
    @Expose({ name: "miner_budget_from_fees" })
    public minerBudgetFromFees: Long;

    // Int64
    @LongToClassSigned
    @Expose({ name: "miner_budget_from_rewards" })
    public minerBudgetFromRewards: Long;

    // UInt32
    @Expose({ name: "accounts_registered_this_interval" })
    public accountsRegisteredThisInterval: number;

    // Int64
    @LongToClassSigned
    @Expose({ name: "recently_missed_count" })
    public recentlyMissedCount: Long;

    // UInt64
    @LongToClass
    @Expose({ name: "current_aslot" })
    public currentAslot: Long;

    @BigIntToClass
    @Expose({ name: "recent_slots_filled" })
    public recentSlotsFilled: BigInteger;

    // UInt32
    @Expose({ name: "dynamic_flags" })
    public dynamicFlags: number;

    // UInt32
    @Expose({ name: "last_irreversible_block_num" })
    public lastIrreversibleBlockNum: number;
}
