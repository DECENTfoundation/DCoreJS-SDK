import { Account } from "../../../models/Account";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetAccountByName extends BaseRequest<Account> {
    constructor(accountName: string) {
        super(ApiGroup.Database, "get_account_by_name", [accountName]);
    }
}
