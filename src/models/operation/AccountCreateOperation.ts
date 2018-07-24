import { Expose } from "class-transformer";
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

    constructor(registrar: ChainObject, name: string, owner: Authority, active: Authority, options: Options) {
        super(OperationType.AccountCreate);
        this.registrar = registrar;
        this.name = name;
        this.owner = owner;
        this.active = active;
        this.options = options;
    }
}
