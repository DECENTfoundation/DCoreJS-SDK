import { Address } from "../../../crypto/Address";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class VerifyAccountAuthority extends BaseRequest<boolean> {
    constructor(
        account: string,
        keys: Address[],
    ) {
        super(
            ApiGroup.Database,
            "verify_account_authority",
            [account, keys.map((address) => address.encoded)],
        );
    }
}
