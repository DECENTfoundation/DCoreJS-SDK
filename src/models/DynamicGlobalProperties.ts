import { Expose, Transform, Type } from "class-transformer";
import * as moment from "moment";
import { Moment } from "moment";
import { ChainObject } from "./ChainObject";

export class DynamicGlobalProperties {

    @Type(() => ChainObject)
    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "head_block_number" })
    public headBlockNumber: number;

    @Expose({ name: "head_block_id" })
    public headBlockId: string;

    @Expose({ name: "time" })
    @Transform((value: string) => moment.utc(value), { toClassOnly: true })
    public time: Moment;

    @Type(() => ChainObject)
    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "current_miner" })
    public currentMiner: ChainObject;

    @Expose({ name: "next_maintenance_time" })
    @Transform((value: string) => moment.utc(value), { toClassOnly: true })
    public nextMaintenanceTime: Moment;

    @Expose({ name: "last_budget_time" })
    @Transform((value: string) => moment.utc(value), { toClassOnly: true })
    public lastBudgetTime: Moment;

    @Expose({ name: "unspent_fee_budget" })
    public unspentFeeBudget: number;

    @Expose({ name: "mined_rewards" })
    public minedRewards: number;

    @Expose({ name: "miner_budget_from_fees" })
    public minerBudgetFromFees: number;

    @Expose({ name: "miner_budget_from_rewards" })
    public minerBudgetFromRewards: number;

    @Expose({ name: "accounts_registered_this_interval" })
    public accountsRegisteredThisInterval: number;

    @Expose({ name: "recently_missed_count" })
    public recentlyMissedCount: number;

    @Expose({ name: "current_aslot" })
    public currentAslot: number;

    @Expose({ name: "recent_slots_filled" })
    public recentSlotsFilled: string;

    @Expose({ name: "dynamic_flags" })
    public dynamicFlags: number;

    @Expose({ name: "last_irreversible_block_num" })
    public lastIrreversibleBlockNum: number;
}
