import { AssetAmount } from "../../../models/AssetAmount";
import { ChainObject } from "../../../models/ChainObject";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

// array
export class GetAccountBalances extends BaseRequest<AssetAmount> {
    constructor(
        accountId: ChainObject,
        assets: ChainObject[],
    ) {
        super(
            ApiGroup.Database,
            "get_account_balances",
            [accountId.objectId, assets.map((value) => value.objectId)],
            AssetAmount,
        );
    }
}
