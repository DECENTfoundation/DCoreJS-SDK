import * as _ from "lodash";
import { AccountNameId } from "../../../models/AccountNameId";
import { ChainObject } from "../../../models/ChainObject";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class LookupAccounts extends BaseRequest<AccountNameId[]> {
    constructor(
        lookupTerm: string,
        limit: number = 1000,
    ) {
        super(
            ApiGroup.Database,
            "lookup_accounts",
            [lookupTerm, _.max([0, _.min([limit, 1000])])],
            (value: [string, string]) => value.map(([name, id]) => new AccountNameId(name, ChainObject.parse(id))),
        );
    }
}
