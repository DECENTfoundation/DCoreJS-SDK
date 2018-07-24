import { plainToClass } from "class-transformer";
import { Asset } from "../../../models/Asset";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class LookupAssetSymbols extends BaseRequest<Asset[]> {
    constructor(
        assetSymbols: string[],
    ) {
        super(
            ApiGroup.Database,
            "lookup_asset_symbols",
            [assetSymbols],
            (value: object[]) => plainToClass(Asset, value),
        );
    }
}
