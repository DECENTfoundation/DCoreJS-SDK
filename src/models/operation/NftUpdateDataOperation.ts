import { Expose, Transform } from "class-transformer";
import { Fee } from "../../DCoreSdk";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { assertThrow } from "../../utils/Utils";
import { ChainObject } from "../ChainObject";
import { ObjectType } from "../ObjectType";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class NftUpdateDataOperation extends BaseOperation {
    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "modifier" })
    public readonly modifier: ChainObject;

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "nft_data_id" })
    public readonly id: ChainObject;

    @Transform((value: Array<[string, any]>) => new Map(value), { toClassOnly: true })
    @Transform((value: any, obj: NftUpdateDataOperation) => Array.from(obj.data), { toPlainOnly: true })
    @Expose({ name: "data" })
    public data: Map<string, any>;

    constructor(modifier: ChainObject, id: ChainObject, data: Map<string, any>, fee?: Fee) {
        super(OperationType.NftUpdateData, fee);
        this.modifier = modifier;
        this.id = id;
        this.data = data;

        assertThrow(modifier.objectType === ObjectType.Account, () => "not a valid account object id");
        assertThrow(id.objectType === ObjectType.NftData, () => "not a valid nft data object id");
    }
}
