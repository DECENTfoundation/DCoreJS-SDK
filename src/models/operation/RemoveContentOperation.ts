import { Expose } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
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

    /**
     * Remove content operation. Sets expiration to head block time, so the content cannot be purchased, but remains in database.
     *
     * @param author content author
     * @param uri content uri
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    constructor(
        author: ChainObject,
        uri: string,
        fee?: AssetAmount | ChainObject,
    ) {
        super(OperationType.ContentCancellation);
        this.author = author;
        this.uri = uri;
        if (fee instanceof AssetAmount) {
            this.fee = fee;
        } else {
            this.feeAssetId = fee;
        }
    }
}
