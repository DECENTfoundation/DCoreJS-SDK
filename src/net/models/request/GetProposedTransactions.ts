import { ChainObject } from "../../../models/ChainObject";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetProposedTransactions extends BaseRequest<object[]> {
    constructor(
        seederId: ChainObject,
    ) {
        super(
            ApiGroup.Database,
            "get_proposed_transactions",
            [seederId.objectId],
        );
    }
}
