import { Observable } from "rxjs";
import { DCoreSdk } from "../DCoreSdk";
import { ChainObject } from "../models/ChainObject";
import { Miner } from "../models/Miner";
export declare class MiningApi {
    private core;
    constructor(core: DCoreSdk);
    /**
     * Returns list of miners by their Ids
     *
     * @param minerIds miner account ids
     *
     * @return a list of miners
     */
    getMiners(minerIds: ChainObject[]): Observable<Miner[]>;
}
