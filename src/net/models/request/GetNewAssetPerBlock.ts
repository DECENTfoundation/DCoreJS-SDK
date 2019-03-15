import * as Long from "long";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetNewAssetPerBlock extends BaseRequest<Long> {
    constructor() {
        super(
            ApiGroup.Database,
            "get_new_asset_per_block",
            [],
            (value: string | number) => Long.fromValue(value).toUnsigned(),
        );
    }
}
