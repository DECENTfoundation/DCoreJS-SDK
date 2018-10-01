import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { PricePerRegion } from "./PricePerRegion";
import { Synopsis } from "./Synopsis";
export declare class Content {
    id: ChainObject;
    coauthors: ChainObject[];
    expiration: Date;
    created: Date;
    price: PricePerRegion;
    size: number;
    synopsis: Synopsis;
    uri: string;
    quorum: number;
    keyParts: object[];
    hash: string;
    lastProof: object[];
    isBlocked: boolean;
    rating: number;
    ratings: number;
    timesBought: number;
    publishingFeeEscrow: AssetAmount;
    seederPrice: object[];
}
