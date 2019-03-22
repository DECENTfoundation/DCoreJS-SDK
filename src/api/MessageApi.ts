import { serialize } from "class-transformer";
import * as _ from "lodash";
import { Observable, zip } from "rxjs";
import { map } from "rxjs/operators";
import { Credentials } from "../crypto/Credentials";
import { DCoreApi } from "../DCoreApi";
import { ChainObject } from "../models/ChainObject";
import { Memo } from "../models/Memo";
import { Message } from "../models/Message";
import { MessagePayload } from "../models/MessagePayload";
import { MessagePayloadReceiver } from "../models/MessagePayloadReceiver";
import { MessageResponse } from "../models/MessageResponse";
import { SendMessageOperation } from "../models/operation/SendMessageOperation";
import { GetMessagesObjects } from "../net/models/request/GetMessagesObjects";
import { assertThrow } from "../utils/Utils";
import { BaseApi } from "./BaseApi";

export class MessageApi extends BaseApi {
    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Get all message operations
     *
     * @param sender filter by sender account id
     * @param receiver filter by receiver account id
     * @param maxCount max items to return
     *
     * @return list of message operation responses
     */
    public getAllOperations(sender?: ChainObject, receiver?: ChainObject, maxCount: number = 1000): Observable<MessageResponse[]> {
        return this.request(new GetMessagesObjects(sender, receiver, maxCount));
    }

    /**
     * Get all messages
     *
     * @param sender filter by sender account id
     * @param receiver filter by receiver account id
     * @param maxCount max items to return
     *
     * @return list of messages
     */
    public getAll(sender?: ChainObject, receiver?: ChainObject, maxCount: number = 1000): Observable<Message[]> {
        return this.getAllOperations(sender, receiver, maxCount).pipe(
            map((list) => _.flatten(list.map((r) => Message.create(r)))),
        );
    }

    /**
     * Get all messages and decrypt
     *
     * @param credentials account credentials used for decryption, must be either sender's or receiver's
     * @param sender filter by sender account id
     * @param receiver filter by receiver account id
     * @param maxCount max items to return
     *
     * @return list of messages
     */
    public getAllDecrypted(
        credentials: Credentials,
        sender?: ChainObject,
        receiver?: ChainObject,
        maxCount: number = 1000,
    ): Observable<Message[]> {
        assertThrow(credentials.account.eq(sender) || credentials.account.eq(receiver), () => "credentials account id must match either sender id or receiver id ");
        return this.getAll(sender, receiver, maxCount).pipe(
            map((list) => list.map((msg) => msg.decrypt(credentials))),
        );
    }

    /**
     * Get all messages for sender and decrypt
     *
     * @param credentials sender account credentials with decryption keys
     * @param maxCount max items to return
     *
     * @return list of messages
     */
    public getAllDecryptedForSender(credentials: Credentials, maxCount: number = 1000): Observable<Message[]> {
        return this.getAllDecrypted(credentials, credentials.account, undefined, maxCount);
    }

    /**
     * Get all messages for receiver and decrypt
     *
     * @param credentials receiver account credentials with decryption keys
     * @param maxCount max items to return
     *
     * @return list of messages
     */
    public getAllDecryptedForReceiver(credentials: Credentials, maxCount: number = 1000): Observable<Message[]> {
        return this.getAllDecrypted(credentials, undefined, credentials.account, maxCount);
    }

    /**
     * Create message operation, send messages to multiple receivers
     *
     * @param credentials sender account credentials
     * @param messages a list of pairs of receiver account id and message
     *
     * @return send message operation
     */
    public createMessageOperation(
        credentials: Credentials,
        messages: Array<[ChainObject, string]>,
    ): Observable<SendMessageOperation> {
        return zip(
            this.api.accountApi.get(credentials.account),
            this.api.accountApi.getAll(messages.map(([id, msg]) => id)),
        ).pipe(
            map(([sender, recipients]) => {
                const payloadRecipients = recipients.map((r, idx) => {
                    const memo = Memo.createEncrypted(messages[idx][1], credentials.keyPair, r.options.memoKey);
                    return new MessagePayloadReceiver(r.id, memo.message, memo.to, memo.nonce);
                });
                const data = new MessagePayload(sender.id, payloadRecipients, sender.options.memoKey);
                return new SendMessageOperation(serialize(data), credentials.account);
            }),
        );
    }

    /**
     * Create message operation, send messages to multiple receivers, unencrypted
     *
     * @param credentials sender account credentials
     * @param messages a list of pairs of receiver account id and message
     *
     * @return send message operation
     */
    public createMessageOperationUnencrypted(
        credentials: Credentials,
        messages: Array<[ChainObject, string]>,
    ): SendMessageOperation {
        return new SendMessageOperation(serialize(MessagePayload.createUnencrypted(credentials.account, messages)), credentials.account);
    }

}
