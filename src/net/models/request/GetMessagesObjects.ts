import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { MessageResponse } from "../../../models/MessageResponse";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
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

        assertThrow(
            (sender ? sender.objectType === ObjectType.Account : true) &&
            (receiver ? receiver.objectType === ObjectType.Account : true),
            () => "not a valid account object id");
    }
}
