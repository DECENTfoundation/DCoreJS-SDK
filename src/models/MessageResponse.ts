import { Expose } from "class-transformer";
import { Moment } from "moment";
import { Address } from "../crypto/Address";
import { AddressToClass, ChainObjectToClass, MomentToClass } from "../utils/TypeAdapters";
import { ChainObject } from "./ChainObject";
import { MessageReceiver } from "./MessageReceiver";

export class MessageResponse {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @MomentToClass
    @Expose({ name: "created" })
    public created: Moment;

    @Expose({ name: "sender" })
    public sender: ChainObject;

    @AddressToClass
    @Expose({ name: "sender_pubkey" })
    public senderAddress?: Address;

    @Expose({ name: "receivers_data" })
    public receiversData: MessageReceiver[];

    @Expose({ name: "text" })
    public text: string;
}
