import { Expose } from "class-transformer";
import * as Long from "long";
import { Moment } from "moment";
import { ChainObjectToClass, LongToClass, MomentToClass } from "../utils/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class DynamicGlobalProperties {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @LongToClass
    @Expose({ name: "head_block_number" })
    public headBlockNumber: Long;

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

    @LongToClass
    @Expose({ name: "unspent_fee_budget" })
    public unspentFeeBudget: Long;

    @LongToClass
    @Expose({ name: "mined_rewards" })
    public minedRewards: Long;

    @LongToClass
    @Expose({ name: "miner_budget_from_fees" })
    public minerBudgetFromFees: Long;

    @LongToClass
    @Expose({ name: "miner_budget_from_rewards" })
    public minerBudgetFromRewards: Long;

    @LongToClass
    @Expose({ name: "accounts_registered_this_interval" })
    public accountsRegisteredThisInterval: Long;

    @LongToClass
    @Expose({ name: "recently_missed_count" })
    public recentlyMissedCount: Long;

    @LongToClass
    @Expose({ name: "current_aslot" })
    public currentAslot: Long;

    @Expose({ name: "recent_slots_filled" })
    public recentSlotsFilled: string;

    @Expose({ name: "dynamic_flags" })
    public dynamicFlags: number;

    @LongToClass
    @Expose({ name: "last_irreversible_block_num" })
    public lastIrreversibleBlockNum: Long;
}
