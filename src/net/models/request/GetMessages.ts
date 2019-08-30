import { plainToClass } from "class-transformer";
import * as _ from "lodash";
import { ChainObject } from "../../../models/ChainObject";
import { Message } from "../../../models/Message";
import { MessageResponse } from "../../../models/MessageResponse";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetMessages extends BaseRequest<Message[]> {
    constructor(
        messageIds: ChainObject[],
    ) {
        super(
            ApiGroup.Messaging,
            "get_messages",
            [messageIds.map((id) => id.objectId)],
            (value: object[]) => _.flatten(plainToClass(MessageResponse, value).map((it) => Message.create(it))),
        );

        assertThrow(messageIds.every((id) => id.objectType === ObjectType.MessagingObject), () => "not a valid messaging object id");
    }
}
