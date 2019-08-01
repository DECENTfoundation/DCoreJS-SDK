import { Expose } from "class-transformer";
import * as Long from "long";
import { Address } from "../crypto/Address";
import { AddressToClass, AddressToPlain, ChainObjectToClass, ChainObjectToPlain, LongToClass, LongToPlain } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class MessageReceiver {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "receiver" })
    public receiver: ChainObject;

    @AddressToPlain
    @AddressToClass
    @Expose({ name: "receiver_pubkey" })
    public receiverAddress?: Address;

    // UInt64
    @LongToPlain
    @LongToClass
    @Expose({ name: "nonce" })
    public nonce: Long;

    @Expose({ name: "data" })
    public data: string;
}
