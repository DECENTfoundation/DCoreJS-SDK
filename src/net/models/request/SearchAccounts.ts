import { plainToClass } from "class-transformer";
import { Account } from "../../../models/Account";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { SearchAccountsOrder } from "../../../models/order/SearchAccountsOrder";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class SearchAccounts extends BaseRequest<Account[]> {
    constructor(
        searchTerm: string,
        order: SearchAccountsOrder = SearchAccountsOrder.NameDesc,
        id: ChainObject = ObjectType.Null.genericId(),
        limit: number = 1000,
    ) {
        super(
            ApiGroup.Database,
            "search_accounts",
            [searchTerm, order, id.objectId, limit],
            (value: object[]) => plainToClass(Account, value),
        );

        assertThrow(id.objectType === ObjectType.Account || id.objectType === ObjectType.Null, () => "not a valid account object id");
    }
}
