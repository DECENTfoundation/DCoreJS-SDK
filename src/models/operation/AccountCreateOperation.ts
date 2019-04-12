import { Expose, Type } from "class-transformer";
import { Address } from "../../crypto/Address";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { AssetAmount } from "../AssetAmount";
import { Authority } from "../Authority";
import { ChainObject } from "../ChainObject";
import { Options } from "../Options";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class AccountCreateOperation extends BaseOperation {

    /**
     * A new account create operation constructor.
     *
     * @param registrar existing account id used to register the new account
     * @param name new account name
     * @param address new account public key address
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     *
     * @return a transaction confirmation
     */
    public static create(registrar: ChainObject, name: string, address: Address, fee?: AssetAmount | ChainObject) {
        return new this(registrar, name, new Authority(address), new Authority(address), new Options(address), fee);
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
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    constructor(registrar: ChainObject, name: string, owner: Authority, active: Authority, options: Options, fee?: AssetAmount | ChainObject) {
        super(OperationType.AccountCreate);
        this.registrar = registrar;
        this.name = name;
        this.owner = owner;
        this.active = active;
        this.options = options;
        if (fee instanceof AssetAmount) {
            this.fee = fee;
        } else {
            this.feeAssetId = fee;
        }
    }
}
