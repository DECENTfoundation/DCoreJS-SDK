import * as _ from "lodash";
import * as Long from "long";
import { Moment } from "moment";
import { Address } from "../crypto/Address";
import { Credentials } from "../crypto/Credentials";
import { ECKeyPair } from "../crypto/ECKeyPair";
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

    public encrypted: boolean;

    constructor(
        public operationId: ChainObject,
        public timestamp: Moment,
        public message: string,
        public sender: ChainObject,
        public receiver: ChainObject,
        public senderAddress?: Address,
        public receiverAddress?: Address,
        public nonce: Long = Long.ZERO,
    ) {
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
        const decrypted = this.decryptOrNull(credentials.keyPair, credentials.account === this.sender ? this.receiverAddress! : this.senderAddress!);
        if (!_.isNil(decrypted)) {
            this.message = decrypted;
            this.encrypted = false;
        }
        return this;
    }

    private decryptOrNull(keyPair: ECKeyPair, address: Address): string | undefined {
        const secret = keyPair.secret(address, this.nonce);
        const clearText = Utils.decrypt(secret, Buffer.from(this.message, "hex"));
        const msg = clearText.slice(4);
        if (Utils.hash256(msg).slice(0, 4).equals(clearText.slice(0, 4))) {
            return msg.toString("utf8");
        } else {
            return;
        }
    }
}
