import { AssetAmount } from "../AssetAmount";
import { Authority } from "../Authority";
import { ChainObject } from "../ChainObject";
import { Options } from "../Options";
import { BaseOperation } from "./BaseOperation";
/**
 * Request to account update operation constructor
 *
 * @param accountId account
 * @param owner owner authority
 * @param active active authority
 * @param options account options
 *
 */
export declare class AccountUpdateOperation extends BaseOperation {
    accountId: ChainObject;
    owner?: Authority;
    active?: Authority;
    options?: Options;
    constructor(accountId: ChainObject, owner?: Authority, active?: Authority, options?: Options, fee?: AssetAmount);
}
