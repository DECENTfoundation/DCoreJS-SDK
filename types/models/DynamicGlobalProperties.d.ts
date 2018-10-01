import { Moment } from "moment";
import { ChainObject } from "./ChainObject";
export declare class DynamicGlobalProperties {
    id: ChainObject;
    headBlockNumber: number;
    headBlockId: string;
    time: Moment;
    currentMiner: ChainObject;
    nextMaintenanceTime: Moment;
    lastBudgetTime: Moment;
    unspentFeeBudget: number;
    minedRewards: number;
    minerBudgetFromFees: number;
    minerBudgetFromRewards: number;
    accountsRegisteredThisInterval: number;
    recentlyMissedCount: number;
    currentAslot: number;
    recentSlotsFilled: string;
    dynamicFlags: number;
    lastIrreversibleBlockNum: number;
}
