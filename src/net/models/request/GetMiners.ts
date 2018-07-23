import { ChainObject } from "../../../models/ChainObject";
import { Miner } from "../../../models/Miner";
import { GetObjects } from "./GetObjects";

// array
export class GetMiners extends GetObjects<Miner> {
    constructor(
        minerIds: ChainObject[],
    ) {
        super(
            Miner,
            minerIds,
        );
    }
}
