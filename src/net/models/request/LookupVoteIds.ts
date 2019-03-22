import { plainToClass } from "class-transformer";
import { Miner } from "../../../models/Miner";
import { VoteId } from "../../../models/VoteId";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class LookupVoteIds extends BaseRequest<Miner[]> {
    constructor(voteIds: VoteId[]) {
        super(
            ApiGroup.Database,
            "lookup_vote_ids",
            [voteIds.map((id) => id.toString())],
            (value: object[]) => plainToClass(Miner, value),
        );
    }
}
