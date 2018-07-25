import { plainToClass } from "class-transformer";
import { AssetAmount } from "../../../models/AssetAmount";
import { ChainObject } from "../../../models/ChainObject";
import { BaseOperation } from "../../../models/operation/BaseOperation";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetRequiredFees extends BaseRequest<AssetAmount[]> {
    constructor(
        operations: BaseOperation[],
        assetId: ChainObject = ChainObject.parse("1.3.0"),
    ) {
        super(
            ApiGroup.Database,
            "get_required_fees",
            [operations.map((value) => [value.type, value]), assetId.objectId],
            (value: object[]) => plainToClass(AssetAmount, value),
        );
    }
}
