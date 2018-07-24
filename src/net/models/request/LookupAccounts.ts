import { plainToClass } from "class-transformer";
import { Account } from "../../../models/Account";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class LookupAccounts extends BaseRequest<Account[]> {
    constructor(
        lookupTerm: string,
        limit: number,
    ) {
        super(
            ApiGroup.Database,
            "lookup_accounts",
            [lookupTerm, limit],
            (value: object[]) => plainToClass(Account, value),
        );
    }
}
