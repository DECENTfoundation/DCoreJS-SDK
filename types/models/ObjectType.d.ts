import { ChainObject } from "./ChainObject";
export declare class ObjectType {
    space: number;
    type: number;
    static Null: ObjectType;
    static Base: ObjectType;
    static Account: ObjectType;
    static Asset: ObjectType;
    static Miner: ObjectType;
    static Custom: ObjectType;
    static Proposal: ObjectType;
    static OperationHistory: ObjectType;
    static WithdrawPermission: ObjectType;
    static VestingBalance: ObjectType;
    static GlobalPropertyObject: ObjectType;
    static DynamicGlobalPropertyObject: ObjectType;
    static ReservedObject: ObjectType;
    static AssetDynamicData: ObjectType;
    static AccountBalanceObject: ObjectType;
    static AccountStatisticsObject: ObjectType;
    static TransactionObject: ObjectType;
    static BlockSummaryObject: ObjectType;
    static AccountTransactionHistoryObject: ObjectType;
    static ChainPropertyObject: ObjectType;
    static MinerScheduleObject: ObjectType;
    static BudgetRecordObject: ObjectType;
    static BuyingObject: ObjectType;
    static ContentObject: ObjectType;
    static PublisherObject: ObjectType;
    static SubscriptionObject: ObjectType;
    static SeedingStatisticsObject: ObjectType;
    static TransactionDetailObject: ObjectType;
    static MessagingObject: ObjectType;
    static types: ObjectType[][];
    private constructor();
    genericId(): ChainObject;
}
