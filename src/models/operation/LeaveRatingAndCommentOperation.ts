import { Expose } from "class-transformer";
import { Fee } from "../../DCoreSdk";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { assertThrow } from "../../utils/Utils";
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

    // UInt64 number is safe for 1-5
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
        rating: 1 | 2 | 3 | 4 | 5,
        comment: string,
        fee?: Fee,
    ) {
        super(OperationType.LeaveRatingAndComment, fee);
        this.uri = uri;
        this.consumer = consumer;
        this.rating = rating;
        this.comment = comment;

        // plainToClass ctor passes undefined args so just skip
        assertThrow(this.rating ? this.rating > 0 && this.rating <= 5 : true, () => "rating must be between 0-5");
        assertThrow(this.comment ? this.comment.length <= 100 : true, () => "comment max length is 100 chars");
    }
}
