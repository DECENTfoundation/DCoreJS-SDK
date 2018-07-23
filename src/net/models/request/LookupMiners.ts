import { Miner } from "../../../models/Miner";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

// array
export class LookupAccounts extends BaseRequest<Miner> {
    constructor(
        lookupTerm: string,
        limit: number,
    ) {
        super(
            ApiGroup.Database,
            "lookup_miner_accounts",
            [lookupTerm, limit],
            Miner,
        );
    }
}
