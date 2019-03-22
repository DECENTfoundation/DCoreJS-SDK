import { plainToClass } from "class-transformer";
import { Account } from "../../../models/Account";
import { ChainObject } from "../../../models/ChainObject";
import { MinerVotingInfo } from "../../../models/MinerVotingInfo";
import { ObjectType } from "../../../models/ObjectType";
import { SearchMinerVotingOrder } from "../../../models/order/SearchMinerVotingOrder";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class SearchMinerVoting extends BaseRequest<MinerVotingInfo[]> {
    constructor(
        searchTerm: string,
        accountName?: string,
        onlyMyVotes: boolean = false,
        order: SearchMinerVotingOrder = SearchMinerVotingOrder.NameDesc,
        id?: ChainObject,
        limit: number = 1000,
    ) {
        super(
            ApiGroup.Database,
            "search_miner_voting",
            [accountName, searchTerm, onlyMyVotes, order, id && id.objectId, limit],
            (value: object[]) => plainToClass(MinerVotingInfo, value),
        );

        assertThrow(id ? (id.objectType === ObjectType.Miner) : true, () => "not a valid miner object id");
        assertThrow(accountName ? Account.isValidName(accountName) : true, () => "not a valid account name");
    }
}
