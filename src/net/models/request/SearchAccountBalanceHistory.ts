import { plainToClass } from "class-transformer";
import * as Long from "long";
import { BalanceChange } from "../../../models/BalanceChange";
import { ChainObject } from "../../../models/ChainObject";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class SearchAccountBalanceHistory extends BaseRequest<BalanceChange[]> {
    constructor(
        accountId: ChainObject,
        assets: ChainObject[] = [],
        recipientAccount?: ChainObject,
        fromBlock: Long = Long.ZERO,
        toBlock: Long = Long.ZERO,
        startOffset: Long = Long.ZERO,
        limit: number = 100,
    ) {
        super(
            ApiGroup.History,
            "search_account_balance_history",
            [
                accountId.objectId,
                assets.map((id) => id.objectId),
                recipientAccount && recipientAccount.objectId,
                fromBlock.toString(),
                toBlock.toString(),
                startOffset.toString(),
                limit,
            ],
            (value: object[]) => plainToClass(BalanceChange, value),
        );
    }
}
