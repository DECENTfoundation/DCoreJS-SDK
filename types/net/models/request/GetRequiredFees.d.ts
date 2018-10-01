import { AssetAmount } from "../../../models/AssetAmount";
import { ChainObject } from "../../../models/ChainObject";
import { BaseOperation } from "../../../models/operation/BaseOperation";
import { BaseRequest } from "./BaseRequest";
export declare class GetRequiredFees extends BaseRequest<AssetAmount[]> {
    constructor(operations: BaseOperation[], assetId?: ChainObject);
}
