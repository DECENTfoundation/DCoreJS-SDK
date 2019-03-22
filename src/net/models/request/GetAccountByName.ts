import { plainToClass } from "class-transformer";
import { Account } from "../../../models/Account";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetAccountByName extends BaseRequest<Account> {
    constructor(
        accountName: string,
    ) {
        super(
            ApiGroup.Database,
            "get_account_by_name",
            [accountName],
            (value: object) => plainToClass(Account, value),
        );

        assertThrow(Account.isValidName(accountName), () => "not a valid account name");
    }
}
