import { AccountStatistics } from "../../../models/AccountStatistics";
import { ChainObject } from "../../../models/ChainObject";
import { GetObjects } from "./GetObjects";

export class GetStatisticsById extends GetObjects<AccountStatistics> {
    constructor(
        objectId: ChainObject,
    ) {
        super(
            AccountStatistics,
            [objectId],
        );
    }
}
