import { Expose } from "class-transformer";
import * as Long from "long";
import { LongToClass } from "../utils/TypeAdapters";

export class MinerRewardInput {

    @LongToClass
    @Expose({ name: "time_to_maint" })
    public timeToMaintenance: Long;

    @LongToClass
    @Expose({ name: "from_accumulated_fees" })
    public fromAccumulatedFees: Long;

    @Expose({ name: "block_interval" })
    public blockInterval: number;

}
