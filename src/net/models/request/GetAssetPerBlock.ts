import * as Long from "long";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetAssetPerBlock extends BaseRequest<Long> {
    constructor(blockNum: Long) {
        super(
            ApiGroup.Database,
            "get_asset_per_block_by_block_num",
            [blockNum.toString()],
            (value: string | number) => Long.fromValue(value).toUnsigned(),
        );
    }
}
