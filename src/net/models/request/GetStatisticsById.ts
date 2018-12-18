import { ChainObject } from "../../../models/ChainObject";
import { Statistics } from "../../../models/Statistics";
import { GetObjects } from "./GetObjects";

export class GetStatisticsById extends GetObjects<Statistics> {
    constructor(
        objectId: ChainObject,
    ) {
        super(
            Statistics,
            [objectId],
        );
    }
}
