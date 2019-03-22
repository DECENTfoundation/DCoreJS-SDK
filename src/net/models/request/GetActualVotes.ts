import { plainToClass } from "class-transformer";
import { MinerVotes } from "../../../models/MinerVotes";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetActualVotes extends BaseRequest<MinerVotes[]> {
    constructor() {
        super(
            ApiGroup.Database,
            "get_actual_votes",
            [],
            (value: object[]) => plainToClass(MinerVotes, value),
        );
    }
}
