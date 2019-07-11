import { Expose } from "class-transformer";
import * as _ from "lodash";
import * as Long from "long";
import { Moment } from "moment";
import { Address } from "../crypto/Address";
import { Credentials } from "../crypto/Credentials";
import { ECKeyPair } from "../crypto/ECKeyPair";
import { AddressToClass, AddressToPlain, ChainObjectToClass, ChainObjectToPlain, LongToClass, LongToPlain, MomentToClass, MomentToPlain } from "../net/adapter/TypeAdapters";
import { assertThrow, Utils } from "../utils/Utils";
import { ChainObject } from "./ChainObject";
import { MessageResponse } from "./MessageResponse";

export class Message {
    public static create(response: MessageResponse): Message[] {
        return response.receiversData.map((rd) => new Message(
            response.id,
            response.created,
            !!(response.senderAddress && rd.receiverAddress) ? rd.data : Buffer.from(rd.data, "hex").slice(4).toString("utf8"),
            response.sender,
            rd.receiver,
            response.senderAddress,
            rd.receiverAddress,
            rd.nonce,
        ));
    }

    @Expose()
    public encrypted: boolean;

    @Expose()
    @ChainObjectToPlain
    @ChainObjectToClass
    public operationId: ChainObject;

    @Expose()
    @MomentToPlain
    @MomentToClass
    public timestamp: Moment;

    @Expose()
    public message: string;

    @Expose()
    @ChainObjectToPlain
    @ChainObjectToClass
    public sender: ChainObject;

    @Expose()
    @ChainObjectToPlain
    @ChainObjectToClass
    public receiver: ChainObject;

    @Expose()
    @AddressToPlain
    @AddressToClass
    public senderAddress?: Address;

    @Expose()
    @AddressToPlain
    @AddressToClass
    public receiverAddress?: Address;

    @Expose()
    @LongToPlain
    @LongToClass
    public nonce: Long = Long.ZERO;

    constructor(operationId: ChainObject, timestamp: Moment, message: string, sender: ChainObject,
                receiver: ChainObject, senderAddress?: Address, receiverAddress?: Address, nonce: Long = Long.ZERO) {
        this.operationId = operationId;
        this.timestamp = timestamp;
        this.message = message;
        this.sender = sender;
        this.receiver = receiver;
        this.senderAddress = senderAddress;
        this.receiverAddress = receiverAddress;
        this.nonce = nonce;
        this.encrypted = !!(this.senderAddress && this.receiverAddress);
    }

    /**
     * Decrypt the message with given credentials
     *
     * @param credentials account credentials
     * @return decrypted message or unchanged message if unable to decrypt with credentials, check the [encrypted] field
     */
    public decrypt(credentials: Credentials): Message {
        if (!this.encrypted) {
            return this;
        }

        assertThrow(!_.isNil(this.senderAddress));
        assertThrow(!_.isNil(this.receiverAddress));
        const decrypted = this.decryptOrNull(credentials.keyPair, credentials.account.eq(this.sender) ? this.receiverAddress! : this.senderAddress!);
        if (!_.isNil(decrypted)) {
            this.message = decrypted;
            this.encrypted = false;
        }
        return this;
    }

    private decryptOrNull(keyPair: ECKeyPair, address: Address): string | undefined {
        try {
            const secret = keyPair.secret(address, this.nonce);
            const clearText = Utils.decrypt(secret, Buffer.from(this.message, "hex"));
            const msg = clearText.slice(4);
            if (Utils.hash256(msg).slice(0, 4).equals(clearText.slice(0, 4))) {
                return msg.toString("utf8");
            }
        } catch (e) {
            return;
        }
    }
}
