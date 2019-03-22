import { Expose, Type } from "class-transformer";
import * as Long from "long";
import { LongToClass } from "../utils/TypeAdapters";
import { FeeSchedule } from "./FeeSchedule";

export class GlobalParameters {

    @Type(() => FeeSchedule)
    @Expose({ name: "current_fees" })
    public fees: FeeSchedule;

    @Expose({ name: "block_interval" })
    public blockInterval: number;

    @LongToClass
    @Expose({ name: "maintenance_interval" })
    public maintenanceInterval: Long;

    @Expose({ name: "maintenance_skip_slots" })
    public maintenanceSkipSlots: number;

    @LongToClass
    @Expose({ name: "miner_proposal_review_period" })
    public minerProposalReviewPeriod: Long;

    @LongToClass
    @Expose({ name: "maximum_transaction_size" })
    public maximumTransactionSize: Long;

    @LongToClass
    @Expose({ name: "maximum_block_size" })
    public maximumBlockSize: Long;

    @LongToClass
    @Expose({ name: "maximum_time_until_expiration" })
    public maximumTimeUntilExpiration: Long;

    @LongToClass
    @Expose({ name: "maximum_proposal_lifetime" })
    public maximumProposalLifetime: Long;

    @Expose({ name: "maximum_asset_feed_publishers" })
    public maximumAssetFeedPublishers: number;

    @Expose({ name: "maximum_miner_count" })
    public maximumMinerCount: number;

    @Expose({ name: "maximum_authority_membership" })
    public maximumAuthorityMembership: number;

    @LongToClass
    @Expose({ name: "cashback_vesting_period_seconds" })
    public cashbackVestingPeriodSeconds: Long;

    @LongToClass
    @Expose({ name: "cashback_vesting_threshold" })
    public cashbackVestingThreshold: Long;

    @Expose({ name: "max_predicate_opcode" })
    public maxPredicateOpcode: number;

    @Expose({ name: "max_authority_depth" })
    public maxAuthorityDepth: number;

    @Expose({ name: "extensions" })
    public extensions: object[];
}
