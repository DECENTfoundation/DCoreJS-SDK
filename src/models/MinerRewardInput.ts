import { Expose } from "class-transformer";
import * as Long from "long";
import { LongToClassSigned, LongToPlain } from "../net/adapter/TypeAdapters";

export class MinerRewardInput {

    // Int64
    @LongToPlain
    @LongToClassSigned
    @Expose({ name: "time_to_maint" })
    public timeToMaintenance: Long;

    // Int64
    @LongToPlain
    @LongToClassSigned
    @Expose({ name: "from_accumulated_fees" })
    public fromAccumulatedFees: Long;

    // Int8
    @Expose({ name: "block_interval" })
    public blockInterval: number;

}
