import * as _ from "lodash";
import { ChainObject } from "../../../models/ChainObject";
import { MinerId } from "../../../models/MinerId";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class LookupMinerAccounts extends BaseRequest<MinerId[]> {
    constructor(
        lookupTerm: string,
        limit: number = 1000,
    ) {
        super(
            ApiGroup.Database,
            "lookup_miner_accounts",
            [lookupTerm, _.max([0, _.min([limit, 1000])])],
            (value: Array<[string, string]>) => value.map(([name, id]) => new MinerId(name, ChainObject.parse(id))),
        );
    }
}
