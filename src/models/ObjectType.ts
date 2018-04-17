export enum ObjectType {
    Null = "0.0.*", // ordinal = 0, type = 0, space = any
    Base = "0.1.1",
    Account = "0.2.1",
    Asset = "0.3.1",
    Miner = "0.4.1",
    Custom = "0.5.1",
    Proposal = "0.6.1",
    OperationHistory = "0.7.1",
    WithdrawPermission = "0.8.1",
    VestingBalance = "0.9.1", // ordinal = 10, type 0

    //  enum impl_object_type, space = 2
    GlobalProperty = "10.0.2",

    // dcore/libraries/chain/include/graphene/chain/protocol/types.hpp
    //  enum object_type, space = 1
    NULL_OBJECT, // ordinal = 0, type = 0, space = any
    BASE_OBJECT,
    ACCOUNT_OBJECT,
    ASSET_OBJECT,
    MINER_OBJECT,
    CUSTOM_OBJECT, //5
    PROPOSAL_OBJECT,
    OPERATION_HISTORY_OBJECT,
    WITHDRAW_PERMISSION_OBJECT,
    VESTING_BALANCE_OBJECT,

    //  enum impl_object_type, space = 2
    GLOBAL_PROPERTY_OBJECT, // ordinal = 10, type 0
    DYNAMIC_GLOBAL_PROPERTY_OBJECT,
    RESERVED_OBJECT,
    ASSET_DYNAMIC_DATA,
    ACCOUNT_BALANCE_OBJECT,
    ACCOUNT_STATISTICS_OBJECT, //5
    TRANSACTION_OBJECT,
    BLOCK_SUMMARY_OBJECT,
    ACCOUNT_TRANSACTION_HISTORY_OBJECT,
    CHAIN_PROPERTY_OBJECT,
    MINER_SCHEDULE_OBJECT, //10
    BUDGET_RECORD_OBJECT,
    BUYING_OBJECT,
    CONTENT_OBJECT,
    PUBLISHER_OBJECT,
    SUBSCRIPTION_OBJECT, //15
    SEEDING_STATISTICS_OBJECT,
    TRANSACTION_DETAIL_OBJECT,
    MESSAGING_OBJECT;
}
