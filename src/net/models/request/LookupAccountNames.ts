import { plainToClass } from "class-transformer";
import { Account } from "../../../models/Account";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class LookupAccountNames extends BaseRequest<Account[]> {
    constructor(
        names: string[],
    ) {
        super(
            ApiGroup.Database,
            "lookup_account_names",
            [names],
            (value: object[]) => plainToClass(Account, value),
        );
    }
}
