import { Expose } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../../utils/TypeAdapters";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class RemoveContentOperation extends BaseOperation {

    @ChainObjectToClass
    @ChainObjectToPlain
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
