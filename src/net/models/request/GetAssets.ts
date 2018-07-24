import { plainToClass } from "class-transformer";
import { Asset } from "../../../models/Asset";
import { ChainObject } from "../../../models/ChainObject";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetAssets extends BaseRequest<Asset[]> {
    constructor(
        assets: ChainObject[],
    ) {
        super(
            ApiGroup.Database,
            "get_assets",
            [assets],
            (value: object[]) => plainToClass(Asset, value),
        );
    }
}
