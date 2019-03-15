import { plainToClass } from "class-transformer";
import { Moment } from "moment";
import { MinerRewardInput } from "../../../models/MinerRewardInput";
import { TypeAdapters } from "../../../utils/TypeAdapters";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetTimeToMaintenance extends BaseRequest<MinerRewardInput> {
    constructor(blockTime: Moment) {
        super(
            ApiGroup.Database,
            "get_time_to_maint_by_block_time",
            [blockTime.utc().format(TypeAdapters.TIMESTAMP_FORMAT)],
            (value: object) => plainToClass(MinerRewardInput, value),
        );
    }
}
