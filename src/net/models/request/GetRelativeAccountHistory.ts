import { plainToClass } from "class-transformer";
import * as _ from "lodash";
import { ChainObject } from "../../../models/ChainObject";
import { OperationHistory } from "../../../models/OperationHistory";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetRelativeAccountHistory extends BaseRequest<OperationHistory[]> {

    constructor(
        accountId: ChainObject,
        stopId: number = 0,
        limit: number = 100,
        startId: number = 0,
    ) {
        super(
            ApiGroup.History,
            "get_relative_account_history",
            [accountId.objectId, stopId, _.max([0, _.min([limit, 100])]), startId],
            (value: object[]) => plainToClass(OperationHistory, value),
        );
    }
}
