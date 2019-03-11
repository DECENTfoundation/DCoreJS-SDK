import { Expose, Transform, Type } from "class-transformer";
import { Moment } from "moment";
import { ChainObjectToClass, ChainObjectToPlain, CoAuthorsToClass, CoAuthorsToPlain, MomentToClass, MomentToPlain } from "../../utils/TypeAdapters";
import { Utils } from "../../utils/Utils";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { CustodyData } from "../CustodyData";
import { KeyPart } from "../KeyPart";
import { RegionalPrice } from "../RegionalPrice";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class AddOrUpdateContentOperation extends BaseOperation {
    @Expose({ name: "size" })
    public size: number = 1;

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
    public quorum: number = 0;

    @Type(() => RegionalPrice)
    @Expose({ name: "price" })
    public price: RegionalPrice[];

    @Expose({ name: "hash" })
    public hash: string;

    @Transform((value: string[]) => value.map((id) => ChainObject.parse(id)), { toClassOnly: true })
    @Transform((value: ChainObject[]) => value.map((id) => id.objectId), { toPlainOnly: true })
    @Expose({ name: "seeders" })
    public seeders: ChainObject[] = [];

    @Type(() => KeyPart)
    @Expose({ name: "key_parts" })
    public keyParts: KeyPart[] = [];

    @MomentToClass
    @MomentToPlain
    @Expose({ name: "expiration" })
    public expiration: Moment;

    @Type(() => AssetAmount)
    @Expose({ name: "publishing_fee" })
    public publishingFee: AssetAmount = new AssetAmount();

    @Expose({ name: "synopsis" })
    public synopsis: string;

    @Type(() => CustodyData)
    @Expose({ name: "cd" })
    public custodyData?: CustodyData;

    constructor(
        author: ChainObject,
        uri: string,
        price: RegionalPrice[],
        expiration: Moment,
        synopsis: string,
        coAuthors: Array<[ChainObject, number]> = [],
        fee?: AssetAmount,
    ) {
        super(OperationType.ContentSubmit);
        this.author = author;
        this.coAuthors = coAuthors;
        this.uri = uri;
        this.price = price;
        this.expiration = expiration;
        this.synopsis = synopsis;
        this.hash = Utils.ripemd160(Buffer.from(uri)).toString("hex");
        this.fee = fee;
    }
}
