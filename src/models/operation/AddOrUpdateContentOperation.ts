import { Expose, Transform, Type } from "class-transformer";
import * as moment from "moment";
import { Moment } from "moment";
import { Utils } from "../../utils/Utils";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { CustodyData } from "../CustodyData";
import { KeyPart } from "../KeyPart";
import { OperationType } from "../OperationType";
import { RegionalPrice } from "../RegionalPrice";
import { BaseOperation } from "./BaseOperation";

export class AddOrUpdateContentOperation extends BaseOperation {
    @Expose({ name: "size" })
    public size: number = 1;

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "author" })
    public author: ChainObject;

    @Transform((value: Array<[string, number]>) => value.map(([id, weight]) => [ChainObject.parse(id), weight]), { toClassOnly: true })
    @Transform((value: object, obj: AddOrUpdateContentOperation) => obj.coAuthors.map(([id, weight]) => [id.objectId, weight]), { toPlainOnly: true })
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

    @Transform((value: string) => moment.utc(value), { toClassOnly: true })
    @Transform((value: any, obj: AddOrUpdateContentOperation) => obj.expiration.utc().format("YYYY-MM-DDTHH:mm:ss"), { toPlainOnly: true })
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
        this.hash = Utils.Base16.encode(Utils.ripemd160(new Buffer(uri)));
        this.fee = fee;
    }
}
