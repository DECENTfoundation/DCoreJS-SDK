import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { VestingBalance } from "../../../models/VestingBalance";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetVestingBalances extends BaseRequest<VestingBalance[]> {
    constructor(
        accountId: ChainObject,
    ) {
        super(
            ApiGroup.Database,
            "get_vesting_balances",
            [accountId.objectId],
            (value: object[]) => plainToClass(VestingBalance, value),
        );

        assertThrow(accountId.objectType === ObjectType.Account, () => "not a valid account object id");
    }
}
