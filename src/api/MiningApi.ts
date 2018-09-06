import { Observable } from "rxjs";
import { DCoreSdk } from "../DCoreSdk";
import { ChainObject } from "../models/ChainObject";
import { Miner } from "../models/Miner";
import { GetMiners } from "../net/models/request/GetMiners";

export class MiningApi {

    constructor(private core: DCoreSdk) {
    }

    /**
     * Returns list of miners by their Ids
     *
     * @param minerIds miner account ids
     *
     * @return a list of miners
     */
    public getMiners(minerIds: ChainObject[]): Observable<Miner[]> {
        return this.core.request(new GetMiners(minerIds));
    }

}
