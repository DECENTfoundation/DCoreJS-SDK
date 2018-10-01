import { Expose, Transform, Type } from "class-transformer";
import { Address } from "../../crypto/Address";
import { AssetAmount } from "../AssetAmount";
import { Authority } from "../Authority";
import { ChainObject } from "../ChainObject";
import { Options } from "../Options";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

/**
 * Request to create account operation constructor
 *
 * @param registrar registrar
 * @param owner owner authority
 * @param active active authority
 * @param options account options
 */
export class AccountCreateOperation extends BaseOperation {

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "registrar" })
    public registrar: ChainObject;

    @Expose({ name: "name" })
    public name: string;

    @Type(() => Authority)
    @Expose({ name: "owner" })
    public owner: Authority;

    @Type(() => Authority)
    @Expose({ name: "active" })
    public active: Authority;

    @Type(() => Options)
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
