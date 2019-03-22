import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { PubKey } from "../../../models/PubKey";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class RestoreEncryptionKey extends BaseRequest<string> {
    constructor(elGamalPrivate: PubKey, purchaseId: ChainObject) {
        super(
            ApiGroup.Database,
            "restore_encryption_key",
            [elGamalPrivate, purchaseId],
        );

        assertThrow(purchaseId.objectType === ObjectType.PurchaseObject, () => "not a valid purchase object id");
    }
}
