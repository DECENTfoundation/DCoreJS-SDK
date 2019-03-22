import { plainToClass } from "class-transformer";
import { AssetAmount } from "../../../models/AssetAmount";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetAccountBalances extends BaseRequest<AssetAmount[]> {
    constructor(
        accountId: ChainObject,
        assets: ChainObject[] = [],
    ) {
        super(
            ApiGroup.Database,
            "get_account_balances",
            [accountId.objectId, assets.map((value) => value.objectId)],
            (value: object[]) => plainToClass(AssetAmount, value),
        );

        assertThrow(accountId.objectType === ObjectType.Account, () => "not a valid account object id");
        assertThrow(assets.every((id) => id.objectType === ObjectType.Asset), () => "not a valid asset object id");
    }
}
