import { Account } from "../../../models/Account";
import { ChainObject } from "../../../models/ChainObject";
import { GetObjects } from "./GetObjects";
export declare class GetAccountById extends GetObjects<Account> {
    constructor(accountIds: ChainObject[]);
}
