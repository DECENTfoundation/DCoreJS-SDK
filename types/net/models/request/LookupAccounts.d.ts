import { AccountNameId } from "../../../models/AccountNameId";
import { BaseRequest } from "./BaseRequest";
export declare class LookupAccounts extends BaseRequest<AccountNameId[]> {
    constructor(lookupTerm: string, limit?: number);
}
