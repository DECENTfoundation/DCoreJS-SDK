import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetFeedsByMiner extends BaseRequest<object> {
    constructor(accountId: ChainObject, count: number = 100) {
        super(
            ApiGroup.Database,
            "get_feeds_by_miner",
            [accountId.objectId, count],
        );

        assertThrow(accountId.objectType === ObjectType.Account, () => "not a valid account object id");
    }
}
