import * as Long from "long";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetAccountCount extends BaseRequest<Long> {
    constructor() {
        super(
            ApiGroup.Database,
            "get_account_count",
            [],
            (value: number) => Long.fromNumber(value),
        );
    }
}
