import * as moment from "moment";
import { Moment } from "moment";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class HeadBlockTime extends BaseRequest<Moment> {
    constructor() {
        super(
            ApiGroup.Database,
            "head_block_time",
            [],
            (value: object) => moment.utc(value),
        );
    }
}
