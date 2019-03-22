import { plainToClass } from "class-transformer";
import { BalanceChange } from "../../../models/BalanceChange";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetAccountBalanceForTransaction extends BaseRequest<BalanceChange> {
    constructor(
        accountId: ChainObject,
        operationId: ChainObject,
    ) {
        super(
            ApiGroup.History,
            "get_account_balance_for_transaction",
            [accountId.objectId, operationId.objectId],
            (value: object) => plainToClass(BalanceChange, value),
        );

        assertThrow(accountId.objectType === ObjectType.Account, () => "not a valid account object id");
        assertThrow(accountId.objectType === ObjectType.OperationHistory, () => "not a valid history object id");
    }
}
