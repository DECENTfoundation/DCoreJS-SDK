import { Expose } from "class-transformer";
import * as Long from "long";
import { Address } from "../crypto/Address";
import { AddressToClass, ChainObjectToClass, LongToClass } from "../utils/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class MessagePayloadReceiver {

    @ChainObjectToClass
    @Expose({ name: "to" })
    public to: ChainObject;

    @Expose({ name: "data" })
    public data: string;

    @AddressToClass
    @Expose({ name: "pub_to" })
    public toAddress?: Address;

    @LongToClass
    @Expose({ name: "nonce" })
    public nonce?: Long;

    constructor(to: ChainObject, data: string, toAddress?: Address, nonce?: Long) {
        this.to = to;
        this.data = data;
        this.toAddress = toAddress;
        this.nonce = nonce;
    }
}
