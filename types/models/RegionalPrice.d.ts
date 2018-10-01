import { AssetAmount } from "./AssetAmount";
export declare class RegionalPrice {
    static NONE: number;
    price: AssetAmount;
    region: number;
    constructor(price: AssetAmount, region?: number);
}
