import { AssetAmount } from "../../../models/AssetAmount";
import { ChainObject } from "../../../models/ChainObject";
import { BaseRequest } from "./BaseRequest";
export declare class GetAccountBalances extends BaseRequest<AssetAmount[]> {
    constructor(accountId: ChainObject, assets?: ChainObject[]);
}
