import { ChainObject } from "../../../models/ChainObject";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetAccountReferences extends BaseRequest<ChainObject[]> {
    constructor(
        accountId: ChainObject,
    ) {
        super(
            ApiGroup.Database,
            "get_account_references",
            [accountId],
            (values: string[]) => values.map((id) => ChainObject.parse(id)),
        );
    }
}
