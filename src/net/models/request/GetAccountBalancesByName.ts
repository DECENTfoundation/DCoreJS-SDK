import { plainToClass } from "class-transformer";
import { AssetAmount } from "../../../models/AssetAmount";
import { ChainObject } from "../../../models/ChainObject";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetAccountBalancesByName extends BaseRequest<AssetAmount[]> {
    constructor(
        accountName: string,
        assets: ChainObject[] = [],
    ) {
        super(
            ApiGroup.Database,
            "get_named_account_balances",
            [accountName, assets.map((value) => value.objectId)],
            (value: object[]) => plainToClass(AssetAmount, value),
        );
    }
}
