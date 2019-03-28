import { AccountStatistics } from "../../../models/AccountStatistics";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { GetObjects } from "./GetObjects";

export class GetStatisticsById extends GetObjects<AccountStatistics> {
    constructor(
        objectIds: ChainObject[],
    ) {
        super(
            AccountStatistics,
            objectIds,
        );

        assertThrow(objectIds.every((id) => id.objectType === ObjectType.AccountStatisticsObject,
            () => "not a valid account statistics object id"));
    }
}
