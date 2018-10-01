import { Asset } from "../../../models/Asset";
import { BaseRequest } from "./BaseRequest";
export declare class LookupAssetSymbols extends BaseRequest<Asset[]> {
    constructor(assetSymbols: string[]);
}
