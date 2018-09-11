import { Expose, Transform, Type } from "class-transformer";
import { AssetAmount } from "../AssetAmount";
import { Authority } from "../Authority";
import { ChainObject } from "../ChainObject";
import { OperationType } from "../OperationType";
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
export class AccountUpdateOperation extends BaseOperation {

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "account" })
    public accountId: ChainObject;

    @Type(() => Authority)
    @Expose({ name: "owner" })
    public owner?: Authority;

    @Type(() => Authority)
    @Expose({ name: "active" })
    public active?: Authority;

    @Type(() => Options)
    @Expose({ name: "options" })
    public options?: Options;

    constructor(accountId: ChainObject, owner?: Authority, active?: Authority, options?: Options, fee?: AssetAmount) {
        super(OperationType.AccountUpdate);
        this.accountId = accountId;
        this.owner = owner;
        this.active = active;
        this.options = options;
        this.fee = fee;
    }
}
