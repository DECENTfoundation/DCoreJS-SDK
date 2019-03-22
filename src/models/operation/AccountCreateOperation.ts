import { Expose, Type } from "class-transformer";
import { Address } from "../../crypto/Address";
import { ChainObjectToClass, ChainObjectToPlain } from "../../utils/TypeAdapters";
import { AssetAmount } from "../AssetAmount";
import { Authority } from "../Authority";
import { ChainObject } from "../ChainObject";
import { Options } from "../Options";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class AccountCreateOperation extends BaseOperation {

    public static create(registrar: ChainObject, name: string, publicKey: Address, fee?: AssetAmount) {
        return new this(registrar, name, new Authority(publicKey), new Authority(publicKey), new Options(publicKey), fee);
    }

    @ChainObjectToClass
    @ChainObjectToPlain
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

    /**
     * Request to create account operation constructor
     *
     * @param registrar registrar
     * @param name account name
     * @param owner owner authority
     * @param active active authority
     * @param options account options
     * @param fee {@link AssetAmount} fee for the operation, if left undefined the fee will be computed in DCT asset
     */
    constructor(registrar: ChainObject, name: string, owner: Authority, active: Authority, options: Options, fee?: AssetAmount) {
        super(OperationType.AccountCreate);
        this.registrar = registrar;
        this.name = name;
        this.owner = owner;
        this.active = active;
        this.options = options;
        this.fee = fee;
    }
}
