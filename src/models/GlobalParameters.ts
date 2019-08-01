import { Expose, Type } from "class-transformer";
import * as Long from "long";
import { LongToClassSigned, LongToPlain } from "../net/adapter/TypeAdapters";
import { FeeSchedule } from "./FeeSchedule";

export class GlobalParameters {

    @Type(() => FeeSchedule)
    @Expose({ name: "current_fees" })
    public fees: FeeSchedule;

    // UInt8
    @Expose({ name: "block_interval" })
    public blockInterval: number;

    // UInt32
    @Expose({ name: "maintenance_interval" })
    public maintenanceInterval: number;

    // UInt8
    @Expose({ name: "maintenance_skip_slots" })
    public maintenanceSkipSlots: number;

    // UInt32
    @Expose({ name: "miner_proposal_review_period" })
    public minerProposalReviewPeriod: number;

    // UInt32
    @Expose({ name: "maximum_transaction_size" })
    public maximumTransactionSize: number;

    // UInt32
    @Expose({ name: "maximum_block_size" })
    public maximumBlockSize: number;

    // UInt32
    @Expose({ name: "maximum_time_until_expiration" })
    public maximumTimeUntilExpiration: number;

    // UInt32
    @Expose({ name: "maximum_proposal_lifetime" })
    public maximumProposalLifetime: number;

    // UInt8
    @Expose({ name: "maximum_asset_feed_publishers" })
    public maximumAssetFeedPublishers: number;

    // UInt16
    @Expose({ name: "maximum_miner_count" })
    public maximumMinerCount: number;

    // UInt16
    @Expose({ name: "maximum_authority_membership" })
    public maximumAuthorityMembership: number;

    // UInt32
    @Expose({ name: "cashback_vesting_period_seconds" })
    public cashbackVestingPeriodSeconds: number;

    // Int64
    @LongToPlain
    @LongToClassSigned
    @Expose({ name: "cashback_vesting_threshold" })
    public cashbackVestingThreshold: Long;

    // UInt16
    @Expose({ name: "max_predicate_opcode" })
    public maxPredicateOpcode: number;

    // UInt8
    @Expose({ name: "max_authority_depth" })
    public maxAuthorityDepth: number;

    @Expose({ name: "extensions" })
    public extensions: object[];
}
