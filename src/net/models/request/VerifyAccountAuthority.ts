import { Address } from "../../../crypto/Address";
import { Account } from "../../../models/Account";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class VerifyAccountAuthority extends BaseRequest<boolean> {
    constructor(
        nameOrId: string,
        keys: Address[],
    ) {
        super(
            ApiGroup.Database,
            "verify_account_authority",
            [nameOrId, keys.map((address) => address.encoded)],
        );

        assertThrow((ChainObject.isValid(nameOrId) && ChainObject.parse(nameOrId).objectType === ObjectType.Account)
            || Account.isValidName(nameOrId), () => "not a valid account object id or name");
    }
}
