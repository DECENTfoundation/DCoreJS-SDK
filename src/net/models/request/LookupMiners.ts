import { plainToClass } from "class-transformer";
import { Miner } from "../../../models/Miner";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class LookupMiners extends BaseRequest<Miner[]> {
    constructor(
        lookupTerm: string,
        limit: number,
    ) {
        super(
            ApiGroup.Database,
            "lookup_miner_accounts",
            [lookupTerm, limit],
            (value: object[]) => plainToClass(Miner, value),
        );
    }
}
