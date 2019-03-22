import { ChainObject } from "../../../models/ChainObject";
import { Miner } from "../../../models/Miner";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { GetObjects } from "./GetObjects";

export class GetMiners extends GetObjects<Miner> {
    constructor(
        minerIds: ChainObject[],
    ) {
        super(
            Miner,
            minerIds,
        );

        assertThrow(minerIds.every((id) => id.objectType === ObjectType.Miner), () => "not a valid miner object id");
    }
}
