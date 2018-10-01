import { Expose, Transform } from "class-transformer";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class RemoveContentOperation extends BaseOperation {

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "author" })
    public author: ChainObject;

    @Expose({ name: "URI" })
    public uri: string;

    constructor(
        author: ChainObject,
        uri: string,
        fee?: AssetAmount,
    ) {
        super(OperationType.ContentCancellation);
        this.author = author;
        this.uri = uri;
        this.fee = fee;
    }
}
