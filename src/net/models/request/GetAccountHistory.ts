import { plainToClass } from "class-transformer";
import * as _ from "lodash";
import { ChainObject } from "../../../models/ChainObject";
import { OperationHistory } from "../../../models/OperationHistory";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetAccountHistory extends BaseRequest<OperationHistory[]> {

    constructor(
        accountId: ChainObject,
        stopId: ChainObject = ChainObject.parse("1.7.0"),
        limit: number = 100,
        startId: ChainObject = ChainObject.parse("1.7.0"),
    ) {
        super(
            ApiGroup.History,
            "get_account_history",
            [accountId.objectId, stopId.objectId, _.max([0, _.min([limit, 100])]), startId.objectId],
            (value: object[]) => plainToClass(OperationHistory, value),
        );
    }
}
