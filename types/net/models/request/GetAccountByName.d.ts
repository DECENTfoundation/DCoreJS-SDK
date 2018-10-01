import { Account } from "../../../models/Account";
import { BaseRequest } from "./BaseRequest";
export declare class GetAccountByName extends BaseRequest<Account> {
    constructor(accountName: string);
}
