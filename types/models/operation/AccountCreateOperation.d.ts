import { Address } from "../../crypto/Address";
import { AssetAmount } from "../AssetAmount";
import { Authority } from "../Authority";
import { ChainObject } from "../ChainObject";
import { Options } from "../Options";
import { BaseOperation } from "./BaseOperation";
/**
 * Request to create account operation constructor
 *
 * @param registrar registrar
 * @param owner owner authority
 * @param active active authority
 * @param options account options
 */
export declare class AccountCreateOperation extends BaseOperation {
    registrar: ChainObject;
    name: string;
    owner: Authority;
    active: Authority;
    options: Options;
    constructor(registrar: ChainObject, name: string, publicKey: Address, fee?: AssetAmount);
}
