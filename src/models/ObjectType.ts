import { ChainObject } from "./ChainObject";

export class ObjectType {
    public static Null = new ObjectType(1, 0);
    public static Base = new ObjectType(1, 1);
    public static Account = new ObjectType(1, 2);
    public static Asset = new ObjectType(1, 3);
    public static Miner = new ObjectType(1, 4);
    public static Custom = new ObjectType(1, 5);
    public static Proposal = new ObjectType(1, 6);
    public static OperationHistory = new ObjectType(1, 7);
    public static WithdrawPermission = new ObjectType(1, 8);
    public static VestingBalance = new ObjectType(1, 9);

    public static GlobalPropertyObject = new ObjectType(2, 0);
    public static DynamicGlobalPropertyObject = new ObjectType(2, 1);
    public static ReservedObject = new ObjectType(2, 2);
    public static AssetDynamicData = new ObjectType(2, 3);
    public static AccountBalanceObject = new ObjectType(2, 4);
    public static AccountStatisticsObject = new ObjectType(2, 5);
    public static TransactionObject = new ObjectType(2, 6);
    public static BlockSummaryObject = new ObjectType(2, 7);
    public static AccountTransactionHistoryObject = new ObjectType(2, 8);
    public static ChainPropertyObject = new ObjectType(2, 9);
    public static MinerScheduleObject = new ObjectType(2, 10);
    public static BudgetRecordObject = new ObjectType(2, 11);
    public static PurchaseObject = new ObjectType(2, 12);
    public static ContentObject = new ObjectType(2, 13);
    public static PublisherObject = new ObjectType(2, 14);
    public static SubscriptionObject = new ObjectType(2, 15);
    public static SeedingStatisticsObject = new ObjectType(2, 16);
    public static TransactionDetailObject = new ObjectType(2, 17);
    public static MessagingObject = new ObjectType(2, 18);

    public static types = [
        [],
        [
            ObjectType.Null,
            ObjectType.Base,
            ObjectType.Account,
            ObjectType.Asset,
            ObjectType.Miner,
            ObjectType.Custom,
            ObjectType.Proposal,
            ObjectType.OperationHistory,
            ObjectType.WithdrawPermission,
            ObjectType.VestingBalance,
        ], [
            ObjectType.GlobalPropertyObject,
            ObjectType.DynamicGlobalPropertyObject,
            ObjectType.ReservedObject,
            ObjectType.AssetDynamicData,
            ObjectType.AccountBalanceObject,
            ObjectType.AccountStatisticsObject,
            ObjectType.TransactionObject,
            ObjectType.BlockSummaryObject,
            ObjectType.AccountTransactionHistoryObject,
            ObjectType.ChainPropertyObject,
            ObjectType.MinerScheduleObject,
            ObjectType.BudgetRecordObject,
            ObjectType.PurchaseObject,
            ObjectType.ContentObject,
            ObjectType.PublisherObject,
            ObjectType.SubscriptionObject,
            ObjectType.SeedingStatisticsObject,
            ObjectType.TransactionDetailObject,
            ObjectType.MessagingObject,
        ]];

    private constructor(public space: number, public type: number) {
    }

    /**
     * Get generic id for type, eg. 1.2.0
     */
    public genericId(): ChainObject {
        return new ChainObject(this);
    }
}
