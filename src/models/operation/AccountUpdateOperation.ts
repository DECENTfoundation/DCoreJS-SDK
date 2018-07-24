import { Expose } from "class-transformer";
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

    @Expose({ name: "account" })
    public accountId: ChainObject;

    @Expose({ name: "owner" })
    public owner?: Authority;

    @Expose({ name: "active" })
    public active?: Authority;

    @Expose({ name: "options" })
    public options?: Options;

    constructor(accountId: ChainObject, owner?: Authority, active?: Authority, options?: Options) {
        super(OperationType.AccountUpdate);
        this.accountId = accountId;
        this.owner = owner;
        this.active = active;
        this.options = options;
    }
}
