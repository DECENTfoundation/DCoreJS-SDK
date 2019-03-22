import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetProposedTransactions extends BaseRequest<object[]> {
    constructor(
        accountId: ChainObject,
    ) {
        super(
            ApiGroup.Database,
            "get_proposed_transactions",
            [accountId.objectId],
        );

        assertThrow(accountId.objectType === ObjectType.Account, () => "not a valid account object id");
    }
}
