import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { KeyPart } from "./KeyPart";
import { PubKey } from "./PubKey";
import { Synopsis } from "./Synopsis";
export declare class Purchase {
    id: ChainObject;
    author: string;
    uri: string;
    synopsis: Synopsis;
    price: AssetAmount;
    priceBefore: AssetAmount;
    priceAfter: AssetAmount;
    seedersAnswered: ChainObject[];
    size: number;
    rating: number;
    comment: string;
    expiration: Date;
    pubElGamalKey: PubKey;
    keyParticles: KeyPart[];
    expired: boolean;
    delivered: boolean;
    deliveryExpiration: Date;
    ratedOrCommented: boolean;
    created: Date;
    regionFrom: number;
}
