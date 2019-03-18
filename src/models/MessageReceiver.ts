import { Expose } from "class-transformer";
import * as Long from "long";
import { Address } from "../crypto/Address";
import { AddressToClass, ChainObjectToClass, LongToClass } from "../utils/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class MessageReceiver {

    @ChainObjectToClass
    @Expose({ name: "receiver" })
    public receiver: ChainObject;

    @AddressToClass
    @Expose({ name: "receiver_pubkey" })
    public receiverAddress?: Address;

    @LongToClass
    @Expose({ name: "nonce" })
    public nonce: Long;

    @Expose({ name: "data" })
    public data: string;
}
