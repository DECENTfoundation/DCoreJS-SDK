import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
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

        assertThrow(accountId.objectType === ObjectType.Account, () => "not a valid account object id");
    }
}
