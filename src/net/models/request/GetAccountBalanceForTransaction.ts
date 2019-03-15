import { plainToClass } from "class-transformer";
import { BalanceChange } from "../../../models/BalanceChange";
import { ChainObject } from "../../../models/ChainObject";
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
    }
}
