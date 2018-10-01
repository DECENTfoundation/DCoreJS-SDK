import { AssetOptions } from "./AssetOptions";
import { ChainObject } from "./ChainObject";
export declare class Asset {
    id: ChainObject;
    symbol: string;
    precision: number;
    issuer: ChainObject;
    description: string;
    options: AssetOptions;
    dynamicAssetDataId: ChainObject;
}
