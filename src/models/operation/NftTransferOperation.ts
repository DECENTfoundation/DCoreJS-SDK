import { Expose, Type } from "class-transformer";
import { Fee } from "../../DCoreSdk";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { assertThrow } from "../../utils/Utils";
import { ChainObject } from "../ChainObject";
import { Memo } from "../Memo";
import { ObjectType } from "../ObjectType";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class NftTransferOperation extends BaseOperation {
    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "from" })
    public readonly from: ChainObject;

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "to" })
    public readonly to: ChainObject;

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "nft_data_id" })
    public readonly id: ChainObject;

    @Type(() => Memo)
    @Expose({ name: "memo" })
    public readonly memo?: Memo;

    constructor(from: ChainObject, to: ChainObject, id: ChainObject, memo?: Memo, fee?: Fee) {
        super(OperationType.NftTransfer, fee);
        this.from = from;
        this.to = to;
        this.id = id;
        this.memo = memo;

        assertThrow(from.objectType === ObjectType.Account, () => "not a valid account object id");
        assertThrow(to.objectType === ObjectType.Account, () => "not a valid account object id");
        assertThrow(id.objectType === ObjectType.NftData, () => "not a valid nft data object id");
    }
}
