import { Expose } from "class-transformer";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { OperationType } from "../OperationType";
import { PubKey } from "../PubKey";
import { BaseOperation } from "./BaseOperation";

/**
 * Request to buy content operation constructor
 *
 * @param uri uri of the content
 * @param consumer chain object id of the buyer's account
 * @param price price of content, can be equal to or higher then specified in content
 * @param publicElGamal public el gamal key
 * @param regionCode region code of the consumer
 */
export class BuyContentOperation extends BaseOperation {
    @Expose({ name: "URI" })
    public uri: string;

    @Expose({ name: "consumer" })
    public consumer: ChainObject;

    @Expose({ name: "price" })
    public price: AssetAmount;

    @Expose({ name: "pubKey" })
    public pubKey: PubKey;

    @Expose({ name: "region_code_from" })
    public regionCode: number = 1;

    constructor(uri: string, consumer: ChainObject, price: AssetAmount, pubKey: PubKey) {
        super(OperationType.RequestToBuy);
        this.uri = uri;
        this.consumer = consumer;
        this.price = price;
        this.pubKey = pubKey;
    }
}
