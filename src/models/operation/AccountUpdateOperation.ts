import { Expose, Type } from "class-transformer";
import { Fee } from "../../DCoreClient";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { Account } from "../Account";
import { AccountOptions } from "../AccountOptions";
import { Authority } from "../Authority";
import { ChainObject } from "../ChainObject";
import { VoteId } from "../VoteId";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class AccountUpdateOperation extends BaseOperation {

    public static create(account: Account, votes: VoteId[], fee?: Fee) {
        const options = account.options;
        options.votes = votes;
        return new AccountUpdateOperation(account.id, undefined, undefined, options, fee);
    }

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "account" })
    public accountId: ChainObject;

    @Type(() => Authority)
    @Expose({ name: "owner" })
    public owner?: Authority;

    @Type(() => Authority)
    @Expose({ name: "active" })
    public active?: Authority;

    @Type(() => AccountOptions)
    @Expose({ name: "new_options" })
    public options?: AccountOptions;

    /**
     * Request to account update operation constructor
     *
     * @param accountId account
     * @param owner owner authority
     * @param active active authority
     * @param options account options
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    constructor(accountId: ChainObject, owner?: Authority, active?: Authority, options?: AccountOptions, fee?: Fee) {
        super(OperationType.AccountUpdate, fee);
        this.accountId = accountId;
        this.owner = owner;
        this.active = active;
        this.options = options;
    }
}
