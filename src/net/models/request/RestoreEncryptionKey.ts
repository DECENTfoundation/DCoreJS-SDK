import { ChainObject } from "../../../models/ChainObject";
import { PubKey } from "../../../models/PubKey";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class RestoreEncryptionKey extends BaseRequest<string> {
    constructor(elGamalPrivate: PubKey, purchaseId: ChainObject) {
        super(
            ApiGroup.Database,
            "restore_encryption_key",
            [elGamalPrivate, purchaseId],
        );
    }
}
