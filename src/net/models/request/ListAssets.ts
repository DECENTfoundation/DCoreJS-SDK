import { plainToClass } from "class-transformer";
import { Asset } from "../../../models/Asset";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class ListAssets extends BaseRequest<Asset[]> {

    constructor(
        lowerBound: string,
        limit: number = 100,
    ) {
        super(
            ApiGroup.Database,
            "list_assets",
            [lowerBound, limit],
            (value: object[]) => plainToClass(Asset, value),
        );
    }
}
