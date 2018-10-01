import { Asset } from "../../../models/Asset";
import { ChainObject } from "../../../models/ChainObject";
import { BaseRequest } from "./BaseRequest";
export declare class GetAssets extends BaseRequest<Asset[]> {
    constructor(assets: ChainObject[]);
}
