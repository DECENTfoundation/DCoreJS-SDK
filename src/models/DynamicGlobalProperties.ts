import { BigInteger } from "big-integer";
import { Expose, Transform } from "class-transformer";
import * as Long from "long";
import { Moment } from "moment";
import { BigIntToClass, ChainObjectToClass, ChainObjectToPlain, LongToClass, LongToClassSigned, LongToPlain, MomentToClass, MomentToPlain } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class DynamicGlobalProperties {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    // UInt32
    @Expose({ name: "head_block_number" })
    public headBlockNumber: number;

    @Expose({ name: "head_block_id" })
    public headBlockId: string;

    @MomentToPlain
    @MomentToClass
    @Expose({ name: "time" })
    public time: Moment;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "current_miner" })
    public currentMiner: ChainObject;

    @MomentToPlain
    @MomentToClass
    @Expose({ name: "next_maintenance_time" })
    public nextMaintenanceTime: Moment;

    @MomentToPlain
    @MomentToClass
    @Expose({ name: "last_budget_time" })
    public lastBudgetTime: Moment;

    // Int64
    @LongToPlain
    @LongToClassSigned
    @Expose({ name: "unspent_fee_budget" })
    public unspentFeeBudget: Long;

    // Int64
    @LongToPlain
    @LongToClassSigned
    @Expose({ name: "mined_rewards" })
    public minedRewards: Long;

    // Int64
    @LongToPlain
    @LongToClassSigned
    @Expose({ name: "miner_budget_from_fees" })
    public minerBudgetFromFees: Long;

    // Int64
    @LongToPlain
    @LongToClassSigned
    @Expose({ name: "miner_budget_from_rewards" })
    public minerBudgetFromRewards: Long;

    // UInt32
    @Expose({ name: "accounts_registered_this_interval" })
    public accountsRegisteredThisInterval: number;

    // Int64
    @LongToPlain
    @LongToClassSigned
    @Expose({ name: "recently_missed_count" })
    public recentlyMissedCount: Long;

    // UInt64
    @LongToPlain
    @LongToClass
    @Expose({ name: "current_aslot" })
    public currentAslot: Long;

    @Transform((value: any, obj: DynamicGlobalProperties) => obj.recentSlotsFilled.toString(), { toPlainOnly: true })
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
