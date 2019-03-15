import { Expose, Type } from "class-transformer";
import { Credentials } from "../../crypto/Credentials";
import { ElGamal } from "../../crypto/ElGamal";
import { ChainObjectToClass, ChainObjectToPlain } from "../../utils/TypeAdapters";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { Content } from "../Content";
import { PubKey } from "../PubKey";
import { Regions } from "../Regions";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

/**
 * Request to buy content operation constructor
 *
 * @param uri uri of the content
 * @param consumer chain object id of the buyer's account
 * @param price price of content, can be equal to or higher then specified in content
 * @param publicElGamal public el gamal key
 * @param regionCode region code of the consumer
 */
export class PurchaseContentOperation extends BaseOperation {
    public static create(credentials: Credentials, content: Content): PurchaseContentOperation {
        return new PurchaseContentOperation(
            content.uri,
            credentials.account,
            content.regionPrice(),
            content.uri.startsWith("ipfs") ? new PubKey(ElGamal.createPublic(credentials.keyPair).toString()) : new PubKey(),
        );
    }

    @Expose({ name: "URI" })
    public uri: string;

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "consumer" })
    public consumer: ChainObject;

    @Type(() => AssetAmount)
    @Expose({ name: "price" })
    public price: AssetAmount;

    @Type(() => PubKey)
    @Expose({ name: "pubKey" })
    public pubKey: PubKey;

    @Expose({ name: "region_code_from" })
    public regionCode: number = Regions.All;

    constructor(uri: string, consumer: ChainObject, price: AssetAmount, pubKey: PubKey) {
        super(OperationType.RequestToBuy);
        this.uri = uri;
        this.consumer = consumer;
        this.price = price;
        this.pubKey = pubKey;
        this.fee = new AssetAmount();
    }
}
