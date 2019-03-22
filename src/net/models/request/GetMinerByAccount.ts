import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { Miner } from "../../../models/Miner";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
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

        assertThrow(accountId.objectType === ObjectType.Account, () => "not a valid account object id");
    }
}
