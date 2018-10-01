import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { ChainObject } from "../models/ChainObject";
import { Miner } from "../models/Miner";
import { GetMiners } from "../net/models/request/GetMiners";
import { BaseApi } from "./BaseApi";

export class MiningApi extends BaseApi {

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Returns list of miners by their Ids
     *
     * @param minerIds miner account ids
     *
     * @return a list of miners
     */
    public getMiners(minerIds: ChainObject[]): Observable<Miner[]> {
        return this.request(new GetMiners(minerIds));
    }

}
