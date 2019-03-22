import * as Long from "long";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetMinerCount extends BaseRequest<Long> {
    constructor() {
        super(
            ApiGroup.Database,
            "get_miner_count",
            [],
            (value: number | string) => Long.fromValue(value).toUnsigned(),
        );
    }
}
