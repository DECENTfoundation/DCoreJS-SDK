import { Expose, Type } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { Memo } from "../Memo";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class AssetIssueOperation extends BaseOperation {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "issuer" })
    public issuer: ChainObject;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "asset_to_issue" })
    public assetToIssue: ChainObject;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "issue_to_account" })
    public issueToAccount: ChainObject;

    @Type(() => Memo)
    @Expose({ name: "memo" })
    public memo?: Memo;

    constructor(issuer: ChainObject, assetToIssue: ChainObject, issueToAccount: ChainObject, memo?: Memo, fee?: AssetAmount | ChainObject) {
        super(OperationType.AssetIssue, fee);
        this.issuer = issuer;
        this.assetToIssue = assetToIssue;
        this.issueToAccount = issueToAccount;
        this.memo = memo;
    }
}
