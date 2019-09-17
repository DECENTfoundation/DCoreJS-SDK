import { Expose, Type } from "class-transformer";
import { Fee } from "../../DCoreClient";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { assertThrow } from "../../utils/Utils";
import { ChainObject } from "../ChainObject";
import { Memo } from "../Memo";
import { ObjectType } from "../ObjectType";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class NftIssueOperation extends BaseOperation {

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "issuer" })
    public readonly issuer: ChainObject;

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "nft_id" })
    public readonly id: ChainObject;

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "to" })
    public readonly to: ChainObject;

    @Expose({ name: "data" })
    public readonly data: any[];

    @Type(() => Memo)
    @Expose({ name: "memo" })
    public readonly memo?: Memo;

    constructor(issuer: ChainObject, id: ChainObject, to: ChainObject, data: any[], memo?: Memo, fee?: Fee) {
        super(OperationType.NftIssue, fee);
        this.issuer = issuer;
        this.id = id;
        this.to = to;
        this.data = data;
        this.memo = memo;

        assertThrow(issuer.objectType === ObjectType.Account, () => "not a valid account object id");
        assertThrow(to.objectType === ObjectType.Account, () => "not a valid account object id");
        assertThrow(id.objectType === ObjectType.Nft, () => "not a valid nft object id");
    }
}
