import { Fee } from "../../DCoreClient";
import { ChainObject } from "../ChainObject";
import { CustomOperation } from "./CustomOperation";
import { CustomOperationType } from "./CustomOperationType";

export class SendMessageOperation extends CustomOperation {

    /**
     * Send message operation.
     *
     * @param messagePayloadJson message payload
     * @param payer account id to pay for the operation
     * @param requiredAuths account ids required to authorize this operation
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    constructor(
        messagePayloadJson: string,
        payer: ChainObject,
        requiredAuths: ChainObject[] = [payer],
        fee?: Fee,
    ) {
        super(CustomOperationType.Messaging, payer, requiredAuths, Buffer.from(messagePayloadJson).toString("hex"), fee);
    }

}
