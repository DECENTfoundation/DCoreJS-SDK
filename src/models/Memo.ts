import { Expose } from "class-transformer";
import * as _ from "lodash/fp";
import * as Long from "long";
import { Address } from "../crypto/Address";
import { ECKeyPair } from "../crypto/ECKeyPair";
import { AddressToClass, AddressToPlain, LongToClass, LongToPlain } from "../utils/TypeAdapters";
import { Utils } from "../utils/Utils";

export class Memo {
    public static createPublic(message: string): Memo {
        return new Memo(Buffer.concat([Buffer.alloc(4, 0), Buffer.from(message)]).toString("hex"));
    }

    public static createEncrypted(message: string, keyPair: ECKeyPair, recipient: Address, nonce: Long = Utils.generateNonce()): Memo {
        const msgBytes = Buffer.from(message);
        const withChecksum = Buffer.concat([Utils.hash256(msgBytes).slice(0, 4), msgBytes]);
        const secret = keyPair.secret(recipient, nonce);
        const cipherText = Utils.encrypt(secret, withChecksum);
        return new Memo(cipherText.toString("hex"), keyPair.publicAddress, recipient, nonce);
    }

    @AddressToClass
    @AddressToPlain
    @Expose({ name: "from" })
    public from?: Address;

    @AddressToClass
    @AddressToPlain
    @Expose({ name: "to" })
    public to?: Address;

    @Expose({ name: "message" })
    public message: string;

    @LongToClass
    @LongToPlain
    @Expose({ name: "nonce" })
    public nonce: Long;

    private constructor(message: string, from?: Address, to?: Address, nonce: Long = Long.ZERO) {
        this.from = from;
        this.to = to;
        this.message = message;
        this.nonce = nonce;
    }

    public decrypt(keyPair: ECKeyPair): string {
        if (_.isNil(this.from) || _.isNil(this.to)) {
            return Buffer.from(this.message, "hex").slice(4).toString("utf8");
        } else if (this.from.publicKey === keyPair.publicKey) {
            return this.decryptWithChecksum(keyPair.secret(this.to, this.nonce));
        } else if (this.to.publicKey === keyPair.publicKey) {
            return this.decryptWithChecksum(keyPair.secret(this.from, this.nonce));
        } else {
            return "";
        }
    }

    private decryptWithChecksum(secret: Buffer) {
        const clearText = Utils.decrypt(secret, Buffer.from(this.message, "hex"));
        const msg = clearText.slice(4);
        if (Utils.hash256(msg).slice(0, 4).equals(clearText.slice(0, 4))) {
            return msg.toString("utf8");
        } else {
            return "";
        }
    }
}
