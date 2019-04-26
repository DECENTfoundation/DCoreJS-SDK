import { plainToClass } from "class-transformer";
import { AssetAmount } from "../../../models/AssetAmount";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class PriceToDct extends BaseRequest<AssetAmount> {
    constructor(
        amount: AssetAmount,
    ) {
        super(
            ApiGroup.Database,
            "price_to_dct",
            [amount],
            (value: object) => plainToClass(AssetAmount, value),
        );
    }
}
