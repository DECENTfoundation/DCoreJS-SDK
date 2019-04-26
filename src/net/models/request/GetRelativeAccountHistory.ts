import { plainToClass } from "class-transformer";
import * as _ from "lodash";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { OperationHistory } from "../../../models/OperationHistory";
import { assertThrow } from "../../../utils/Utils";
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

        assertThrow(accountId.objectType === ObjectType.Account, () => "not a valid account object id");
        assertThrow(stopId >= 0, () => "stop id cannot be negative number");
        assertThrow(startId >= 0, () => "start id cannot be negative number");
    }
}
