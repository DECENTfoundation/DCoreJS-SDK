import { Asset } from "../../../models/Asset";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

// array
export class LookupAssetSymbols extends BaseRequest<Asset> {
    constructor(
        assetSymbols: string[],
    ) {
        super(
            ApiGroup.Database,
            "lookup_asset_symbols",
            [assetSymbols],
            Asset,
        );
    }
}
