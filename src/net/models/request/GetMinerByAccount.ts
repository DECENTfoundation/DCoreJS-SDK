import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { Miner } from "../../../models/Miner";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetMinerByAccount extends BaseRequest<Miner> {
    constructor(accountId: ChainObject) {
        super(
            ApiGroup.Database,
            "get_miner_by_account",
            [accountId.objectId],
            (value: object) => plainToClass(Miner, value),
        );
    }
}
