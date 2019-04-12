import { Expose } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { assertThrow } from "../../utils/Utils";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class LeaveRatingAndCommentOperation extends BaseOperation {

    @Expose({ name: "URI" })
    public uri: string;

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "consumer" })
    public consumer: ChainObject;

    @Expose({ name: "rating" })
    public rating: number;

    @Expose({ name: "comment" })
    public comment: string;

    /**
     * Leave comment and rating operation constructor
     *
     * @param uri uri of the content
     * @param consumer chain object id of the buyer's account
     * @param rating 1-5 stars
     * @param comment max 100 chars
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    constructor(
        uri: string,
        consumer: ChainObject,
        rating: 1|2|3|4|5,
        comment: string,
        fee?: AssetAmount | ChainObject,
    ) {
        super(OperationType.LeaveRatingAndComment);

        assertThrow(rating > 0 && rating <= 5, () => "rating must be between 0-5");
        assertThrow(comment.length <= 100, () => "comment max length is 100 chars");

        this.uri = uri;
        this.consumer = consumer;
        this.rating = rating;
        this.comment = comment;
        if (fee instanceof AssetAmount) {
            this.fee = fee;
        } else {
            this.feeAssetId = fee;
        }
    }
}
