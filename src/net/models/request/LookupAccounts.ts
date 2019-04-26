import * as _ from "lodash";
import { ChainObject } from "../../../models/ChainObject";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class LookupAccounts extends BaseRequest<Map<string, ChainObject>> {
    constructor(
        lookupTerm: string,
        limit: number = 1000,
    ) {
        super(
            ApiGroup.Database,
            "lookup_accounts",
            [lookupTerm, _.max([0, _.min([limit, 1000])])],
            (value: Array<[string, string]>) =>
                new Map(value.map(([name, id]) => [name, ChainObject.parse(id)] as [string, ChainObject])),
        );
    }
}
