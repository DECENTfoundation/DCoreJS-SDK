import { Expose, Type } from "class-transformer";
import { Address } from "../crypto/Address";
import { AddressToClass, AddressToPlain, ChainObjectToClass, ChainObjectToPlain } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";
import { Memo } from "./Memo";
import { MessagePayloadReceiver } from "./MessagePayloadReceiver";

export class MessagePayload {

    /**
     * unencrypted message payload constructor
     *
     * @param from account id of the sender
     * @param messages pairs of receiver account id to message text
     */
    public static createUnencrypted(from: ChainObject, messages: Array<[ChainObject, string]>): MessagePayload {
        return new MessagePayload(from, messages.map(([id, msg]) => new MessagePayloadReceiver(id, Memo.createPublic(msg).message)));
    }

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "from" })
    public from: ChainObject;

    @Type(() => MessagePayloadReceiver)
    @Expose({ name: "receivers_data" })
    public receiversData: MessagePayloadReceiver[];

    @AddressToClass
    @AddressToPlain
    @Expose({ name: "pub_from" })
    public fromAddress?: Address;

    constructor(from: ChainObject, receiversData: MessagePayloadReceiver[], fromAddress?: Address) {
        this.from = from;
        this.receiversData = receiversData;
        this.fromAddress = fromAddress;
    }
}
