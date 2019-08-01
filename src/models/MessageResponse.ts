import { Expose, Type } from "class-transformer";
import { Moment } from "moment";
import { Address } from "../crypto/Address";
import { AddressToClass, AddressToPlain, ChainObjectToClass, ChainObjectToPlain, MomentToClass, MomentToPlain } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";
import { MessageReceiver } from "./MessageReceiver";

export class MessageResponse {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @MomentToPlain
    @MomentToClass
    @Expose({ name: "created" })
    public created: Moment;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "sender" })
    public sender: ChainObject;

    @AddressToPlain
    @AddressToClass
    @Expose({ name: "sender_pubkey" })
    public senderAddress?: Address;

    @Type(() => MessageReceiver)
    @Expose({ name: "receivers_data" })
    public receiversData: MessageReceiver[];

    @Expose({ name: "text" })
    public text: string;
}
