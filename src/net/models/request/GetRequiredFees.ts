import { plainToClass } from "class-transformer";
import { DCoreConstants } from "../../../DCoreConstants";
import { AssetAmount } from "../../../models/AssetAmount";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { BaseOperation } from "../../../models/operation/BaseOperation";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetRequiredFees extends BaseRequest<AssetAmount[]> {
    constructor(
        operations: BaseOperation[],
        assetId: ChainObject = DCoreConstants.DCT_ASSET_ID,
    ) {
        super(
            ApiGroup.Database,
            "get_required_fees",
            [operations.map((value) => [value.type, value]), assetId.objectId],
            (value: object[]) => plainToClass(AssetAmount, value),
        );

        assertThrow(assetId.objectType === ObjectType.Asset, () => "not a valid asset object id");
    }
}
