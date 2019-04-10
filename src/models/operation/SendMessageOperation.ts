import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { CustomOperation } from "./CustomOperation";
import { CustomOperationType } from "./CustomOperationType";

export class SendMessageOperation extends CustomOperation {

    constructor(
        messagePayloadJson: string,
        payer: ChainObject,
        requiredAuths: ChainObject[] = [payer],
        fee?: AssetAmount,
    ) {
        super(CustomOperationType.Messaging, payer, requiredAuths, Buffer.from(messagePayloadJson).toString("hex"), fee);
    }

}
