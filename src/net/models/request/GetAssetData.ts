import { AssetData } from "../../../models/AssetData";
import { ChainObject } from "../../../models/ChainObject";
import { GetObjects } from "./GetObjects";

export class GetAssetData extends GetObjects<AssetData> {
    constructor(
        ids: ChainObject[],
    ) {
        super(
            AssetData,
            ids,
        );
    }
}
