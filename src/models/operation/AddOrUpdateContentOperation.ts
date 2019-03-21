import { Expose, serialize, Type } from "class-transformer";
import * as Long from "long";
import { Moment } from "moment";
import {
    ChainObjectArrayToClass,
    ChainObjectArrayToPlain,
    ChainObjectToClass,
    ChainObjectToPlain,
    CoAuthorsToClass,
    CoAuthorsToPlain,
    LongToClass,
    LongToPlain,
    MomentToClass,
    MomentToPlain,
} from "../../utils/TypeAdapters";
import { Utils } from "../../utils/Utils";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { CustodyData } from "../CustodyData";
import { KeyPart } from "../KeyPart";
import { RegionalPrice } from "../RegionalPrice";
import { Synopsis } from "../Synopsis";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class AddOrUpdateContentOperation extends BaseOperation {

    public static create(
        author: ChainObject,
        coAuthors: Array<[ChainObject, number]>,
        uri: string,
        price: RegionalPrice,
        expiration: Moment,
        synopsis: Synopsis,
        fee?: AssetAmount,
    ): AddOrUpdateContentOperation {
        return new this(Long.fromNumber(1), author, coAuthors, uri, 0, [price],
            Utils.ripemd160(Buffer.from(uri)).toString("hex"), [], [], expiration, new AssetAmount(), serialize(synopsis), undefined, fee);
    }

    @LongToClass
    @LongToPlain
    @Expose({ name: "size" })
    public size: Long;

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "author" })
    public author: ChainObject;

    @CoAuthorsToClass
    @CoAuthorsToPlain
    @Expose({ name: "co_authors" })
    public coAuthors: Array<[ChainObject, number]>;

    @Expose({ name: "URI" })
    public uri: string;

    @Expose({ name: "quorum" })
    public quorum: number;

    @Type(() => RegionalPrice)
    @Expose({ name: "price" })
    public price: RegionalPrice[];

    @Expose({ name: "hash" })
    public hash: string;

    @ChainObjectArrayToClass
    @ChainObjectArrayToPlain
    @Expose({ name: "seeders" })
    public seeders: ChainObject[];

    @Type(() => KeyPart)
    @Expose({ name: "key_parts" })
    public keyParts: KeyPart[];

    @MomentToClass
    @MomentToPlain
    @Expose({ name: "expiration" })
    public expiration: Moment;

    @Type(() => AssetAmount)
    @Expose({ name: "publishing_fee" })
    public publishingFee: AssetAmount;

    @Expose({ name: "synopsis" })
    public synopsis: string;

    @Type(() => CustodyData)
    @Expose({ name: "cd" })
    public custodyData?: CustodyData;

    /**
     * Request to submit content operation constructor
     *
     * @param size size of content, including samples, in megabytes
     * @param author author of the content. If co-authors is not filled, this account will receive full payout
     * @param coAuthors optional parameter. If map is not empty, payout will be split - the parameter maps co-authors
     * to basis points split, e.g. author1:9000 (bp), author2:1000 (bp)
     * @param uri URI where the content can be found
     * @param quorum how many seeders needs to cooperate to recover the key
     * @param price list of regional prices
     * @param hash hash of the content. Should be 40 chars long, hex encoded
     * @param seeders list of selected seeders
     * @param keyParts key particles, each assigned to one of the seeders, encrypted with his key
     * @param expiration content expiration time
     * @param publishingFee fee must be greater than the sum of seeders' publishing prices * number of days. Is paid by author
     * @param synopsis JSON formatted structure containing content information
     * @param custodyData if cd.n == 0 then no custody is submitted, and simplified verification is done.
     * @param fee [AssetAmount] fee for the operation, if left [BaseOperation.FEE_UNSET] the fee will be computed in DCT asset
     */
    constructor(
        size: Long,
        author: ChainObject,
        coAuthors: Array<[ChainObject, number]> = [],
        uri: string,
        quorum: number,
        price: RegionalPrice[],
        hash: string,
        seeders: ChainObject[],
        keyParts: KeyPart[],
        expiration: Moment,
        publishingFee: AssetAmount,
        synopsis: string,
        custodyData?: CustodyData,
        fee?: AssetAmount,
    ) {
        super(OperationType.ContentSubmit);
        this.size = size;
        this.author = author;
        this.coAuthors = coAuthors;
        this.uri = uri;
        this.quorum = quorum;
        this.price = price;
        this.hash = hash;
        this.seeders = seeders;
        this.keyParts = keyParts;
        this.expiration = expiration;
        this.publishingFee = publishingFee;
        this.synopsis = synopsis;
        this.custodyData = custodyData;
        this.fee = fee;
    }
}
