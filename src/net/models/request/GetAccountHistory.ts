import { plainToClass } from "class-transformer";
import * as _ from "lodash";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { OperationHistory } from "../../../models/OperationHistory";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetAccountHistory extends BaseRequest<OperationHistory[]> {

    constructor(
        accountId: ChainObject,
        stopId: ChainObject = ObjectType.OperationHistory.genericId(),
        limit: number = 100,
        startId: ChainObject = ObjectType.OperationHistory.genericId(),
    ) {
        super(
            ApiGroup.History,
            "get_account_history",
            [accountId.objectId, stopId.objectId, _.max([0, _.min([limit, 100])]), startId.objectId],
            (value: object[]) => plainToClass(OperationHistory, value),
        );

        assertThrow(accountId.objectType === ObjectType.Account, () => "not a valid account object id");
        assertThrow(startId.objectType === ObjectType.OperationHistory, () => "not a valid history object id");
        assertThrow(stopId.objectType === ObjectType.OperationHistory, () => "not a valid history object id");
    }
}
