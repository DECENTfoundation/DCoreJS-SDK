import * as Long from "long";
import { ChainObject } from "./ChainObject";
export declare class AssetAmount {
    amount: Long;
    assetId: ChainObject;
    constructor(amount?: Long | number | string, assetId?: ChainObject);
}
