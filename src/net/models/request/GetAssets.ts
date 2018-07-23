import { Asset } from "../../../models/Asset";
import { ChainObject } from "../../../models/ChainObject";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

// array
export class GetAssets extends BaseRequest<Asset> {
    constructor(
        assets: ChainObject[],
    ) {
        super(
            ApiGroup.Database,
            "get_assets",
            [assets],
            Asset,
        );
    }
}
