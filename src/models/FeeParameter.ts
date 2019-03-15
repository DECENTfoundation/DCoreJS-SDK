import { AssetAmount } from "./AssetAmount";

export class FeeParameter {
    constructor(public fee: AssetAmount, public pricePerKb?: AssetAmount) {
    }
}
