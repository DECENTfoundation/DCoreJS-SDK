import { ChainObject } from "../../../models/ChainObject";
import { Miner } from "../../../models/Miner";
import { GetObjects } from "./GetObjects";
export declare class GetMiners extends GetObjects<Miner> {
    constructor(minerIds: ChainObject[]);
}
