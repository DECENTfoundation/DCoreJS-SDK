import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
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
export declare class BuyContentOperation extends BaseOperation {
    uri: string;
    consumer: ChainObject;
    price: AssetAmount;
    pubKey: PubKey;
    regionCode: number;
    constructor(uri: string, consumer: ChainObject, price: AssetAmount, pubKey: PubKey);
}
