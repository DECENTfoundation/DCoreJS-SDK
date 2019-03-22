import { plainToClass } from "class-transformer";
import { Account } from "../../../models/Account";
import { AssetAmount } from "../../../models/AssetAmount";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetNamedAccountBalances extends BaseRequest<AssetAmount[]> {
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

        assertThrow(Account.isValidName(accountName), () => "not a valid account name");
        assertThrow(assets.every((id) => id.objectType === ObjectType.Asset), () => "not a valid asset object id");
    }
}
