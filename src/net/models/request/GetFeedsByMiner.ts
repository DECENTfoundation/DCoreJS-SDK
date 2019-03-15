import { ChainObject } from "../../../models/ChainObject";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetFeedsByMiner extends BaseRequest<object> {
    constructor(accountId: ChainObject, count: number = 100) {
        super(
            ApiGroup.Database,
            "get_feeds_by_miner",
            [accountId.objectId, count],
        );
    }
}
