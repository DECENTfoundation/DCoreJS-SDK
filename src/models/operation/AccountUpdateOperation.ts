import { Expose, Type } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../../utils/TypeAdapters";
import { Account } from "../Account";
import { AssetAmount } from "../AssetAmount";
import { Authority } from "../Authority";
import { ChainObject } from "../ChainObject";
import { Options } from "../Options";
import { VoteId } from "../VoteId";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class AccountUpdateOperation extends BaseOperation {
    public static create(account: Account, votes: VoteId[]) {
        const options = account.options;
        options.votes = votes;
        return new AccountUpdateOperation(account.id, undefined, undefined, options);
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

    @Type(() => Options)
    @Expose({ name: "options" })
    public options?: Options;

    /**
     * Request to account update operation constructor
     *
     * @param accountId account
     * @param owner owner authority
     * @param active active authority
     * @param options account options
     * @param fee {@link AssetAmount} fee for the operation, if left undefined the fee will be computed in DCT asset
     */
    constructor(accountId: ChainObject, owner?: Authority, active?: Authority, options?: Options, fee?: AssetAmount) {
        super(OperationType.AccountUpdate);
        this.accountId = accountId;
        this.owner = owner;
        this.active = active;
        this.options = options;
        this.fee = fee;
    }
}
