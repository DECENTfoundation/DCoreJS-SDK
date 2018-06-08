import { Expose, Transform, Type } from "class-transformer";
import { ChainObject } from "./ChainObject";

export class DynamicGlobalProperties {

    @Type(() => ChainObject)
    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "head_block_number" })
    public headBlockNumber: number;

    @Expose({ name: "head_block_id" })
    public headBlockId: string;

    @Type(() => Date)
    @Expose({ name: "time" })
    public time: Date;

    @Type(() => ChainObject)
    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "current_miner" })
    public currentMiner: ChainObject;

    @Type(() => Date)
    @Expose({ name: "next_maintenance_time" })
    public nextMaintenanceTime: Date;

    @Type(() => Date)
    @Expose({ name: "last_budget_time" })
    public lastBudgetTime: Date;

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
