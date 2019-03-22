import { plainToClass } from "class-transformer";
import { Asset } from "../../../models/Asset";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetAssets extends BaseRequest<Asset[]> {
    constructor(
        assets: ChainObject[],
    ) {
        super(
            ApiGroup.Database,
            "get_assets",
            [assets.map((id) => id.objectId)],
            (value: object[]) => plainToClass(Asset, value),
        );

        assertThrow(assets.every((id) => id.objectType === ObjectType.Asset), () => "not a valid asset object id");
    }
}
