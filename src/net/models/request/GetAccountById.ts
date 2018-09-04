import { Account } from "../../../models/Account";
import { ChainObject } from "../../../models/ChainObject";
import { GetObjects } from "./GetObjects";

export class GetAccountById extends GetObjects<Account> {
    constructor(
        accountId: ChainObject,
    ) {
        super(
            Account,
            [accountId],
        );
    }
}
