import { Expose } from "class-transformer";
import { Address } from "../../crypto/Address";
import { AssetAmount } from "../AssetAmount";
import { Authority } from "../Authority";
import { ChainObject } from "../ChainObject";
import { OperationType } from "../OperationType";
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
export class AccountCreateOperation extends BaseOperation {

    @Expose({ name: "registrar" })
    public registrar: ChainObject;

    @Expose({ name: "name" })
    public name: string;

    @Expose({ name: "owner" })
    public owner: Authority;

    @Expose({ name: "active" })
    public active: Authority;

    @Expose({ name: "options" })
    public options: Options;

    constructor(registrar: ChainObject, name: string, publicKey: Address, fee?: AssetAmount) {
        super(OperationType.AccountCreate);
        this.registrar = registrar;
        this.name = name;
        this.owner = new Authority(publicKey);
        this.active = new Authority(publicKey);
        this.options = new Options(publicKey);
        this.fee = fee;
    }
}
