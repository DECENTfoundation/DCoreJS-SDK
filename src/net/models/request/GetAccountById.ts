import { Account } from "../../../models/Account";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { GetObjects } from "./GetObjects";

export class GetAccountById extends GetObjects<Account> {
    constructor(
        accountIds: ChainObject[],
    ) {
        super(
            Account,
            accountIds,
        );

        assertThrow(accountIds.every((id) => id.objectType === ObjectType.Account), () => "not a valid account object id");
    }
}
