import { Expose, Type } from "class-transformer";
import { Fee } from "../../DCoreSdk";
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

    @Type(() => AssetAmount)
    @Expose({ name: "asset_to_issue" })
    public assetToIssue: AssetAmount;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "issue_to_account" })
    public issueToAccount: ChainObject;

    @Type(() => Memo)
    @Expose({ name: "memo" })
    public memo?: Memo;

    /**
     * Issue asset operation constructor. Only the issuer of the asset can issue some funds until maxSupply is reached.
     *
     * @param issuer asset issuer account id
     * @param assetToIssue asset amount to issue
     * @param issueToAccount account id receiving the created funds
     * @param memo optional memo for receiver
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    constructor(issuer: ChainObject, assetToIssue: AssetAmount, issueToAccount: ChainObject, memo?: Memo, fee?: Fee) {
        super(OperationType.AssetIssue, fee);
        this.issuer = issuer;
        this.assetToIssue = assetToIssue;
        this.issueToAccount = issueToAccount;
        this.memo = memo;
    }
}
