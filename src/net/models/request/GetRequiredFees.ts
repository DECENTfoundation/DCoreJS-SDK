import { AssetAmount } from "../../../models/AssetAmount";
import { ChainObject } from "../../../models/ChainObject";
import { BaseOperation } from "../../../models/operation/BaseOperation";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

// array
export class GetRequiredFees extends BaseRequest<AssetAmount> {
    constructor(
        operations: BaseOperation[],
        assetId: ChainObject,
    ) {
        super(
            ApiGroup.Database,
            "get_required_fees",
            [operations.map((value) => [value.type, value]), assetId],
            AssetAmount,
        );
    }
}
