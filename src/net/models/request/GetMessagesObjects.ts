import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { MessageResponse } from "../../../models/MessageResponse";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetMessagesObjects extends BaseRequest<MessageResponse[]> {
    constructor(
        sender?: ChainObject,
        receiver?: ChainObject,
        count: number = 1000,
    ) {
        super(
            ApiGroup.Messaging,
            "get_message_objects",
            [sender && sender.objectId, receiver && receiver.objectId, count],
            (value: object[]) => plainToClass(MessageResponse, value),
        );
    }
}
