import { AccountStatistics } from "../../../models/AccountStatistics";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { GetObjects } from "./GetObjects";

export class GetStatisticsById extends GetObjects<AccountStatistics> {
    constructor(
        objectId: ChainObject,
    ) {
        super(
            AccountStatistics,
            [objectId],
        );

        assertThrow(objectId.objectType === ObjectType.AccountStatisticsObject, () => "not a valid account statistics object id");
    }
}
