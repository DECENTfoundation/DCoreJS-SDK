import { AssetAmount } from "../../../models/AssetAmount";
import { ChainObject } from "../../../models/ChainObject";
import { BaseRequest } from "./BaseRequest";
export declare class GetAccountBalancesByName extends BaseRequest<AssetAmount[]> {
    constructor(accountName: string, assets?: ChainObject[]);
}
