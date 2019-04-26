import { Moment } from "moment";
import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { ChainProperties } from "../models/ChainProperties";
import { DynamicGlobalProperties } from "../models/DynamicGlobalProperties";
import { GlobalProperties } from "../models/GlobalProperties";
import { MinerRewardInput } from "../models/MinerRewardInput";
import { GetChainId } from "../net/models/request/GetChainId";
import { GetChainProperties } from "../net/models/request/GetChainProperties";
import { GetConfig } from "../net/models/request/GetConfig";
import { GetDynamicGlobalProps } from "../net/models/request/GetDynamicGlobalProps";
import { GetGlobalProperties } from "../net/models/request/GetGlobalProperties";
import { GetTimeToMaintenance } from "../net/models/request/GetTimeToMaintenance";
import { BaseApi } from "./BaseApi";

export class GeneralApi extends BaseApi {
    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Retrieve properties associated with the chain.
     *
     * @return chain id and immutable chain parameters
     */
    public getChainProperties(): Observable<ChainProperties> {
        return this.request(new GetChainProperties());
    }

    /**
     * Retrieve global properties. This object contains all of the properties of the blockchain that are fixed
     * or that change only once per maintenance interval such as the current list of miners, block interval, etc.
     *
     * @return global property object
     */
    public getGlobalProperties(): Observable<GlobalProperties> {
        return this.request(new GetGlobalProperties());
    }

    /**
     * Retrieve compile-time constants.
     *
     * @return configured constants
     */
    public getConfig(): Observable<object> {
        return this.request(new GetConfig());
    }

    /**
     * Get the chain ID.
     *
     * @return the chain ID identifying blockchain network
     */
    public getChainId(): Observable<string> {
        return this.request(new GetChainId());
    }

    /**
     * Retrieve the dynamic properties. The returned object contains information that changes every block interval,
     * such as the head block number, the next miner, etc.
     *
     * @return dynamic property object
     */
    public getDynamicGlobalProperties(): Observable<DynamicGlobalProperties> {
        return this.request(new GetDynamicGlobalProps());
    }

    /**
     * Get remaining time to next maintenance interval from given time.
     *
     * @param time reference time
     *
     * @return remaining time to next maintenance interval along with some additional data
     */
    public getTimeToMaintenance(time: Moment): Observable<MinerRewardInput> {
        return this.request(new GetTimeToMaintenance(time));
    }

}
