import { serialize } from "class-transformer";
import * as _ from "lodash";
import { Observable, of, zip } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { Credentials } from "../../crypto/Credentials";
import { Fee } from "../../DCoreClient";
import { ChainObject } from "../../models/ChainObject";
import { Memo } from "../../models/Memo";
import { Message } from "../../models/Message";
import { MessagePayload } from "../../models/MessagePayload";
import { MessagePayloadReceiver } from "../../models/MessagePayloadReceiver";
import { MessageResponse } from "../../models/MessageResponse";
import { SendMessageOperation } from "../../models/operation/SendMessageOperation";
import { TransactionConfirmation } from "../../models/TransactionConfirmation";
import { GetMessagesObjects } from "../../net/models/request/GetMessagesObjects";
import { assertThrow } from "../../utils/Utils";
import { BaseApi } from "./BaseApi";
import { DCoreApi } from "./DCoreApi";

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
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     *
     * @return send message operation
     */
    public createMessageOperation(
        credentials: Credentials,
        messages: Array<[ChainObject, string]>,
        fee?: Fee,
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
                return new SendMessageOperation(serialize(data), credentials.account, undefined, fee);
            }),
        );
    }

    /**
     * Create message operation, send messages to multiple receivers, unencrypted
     *
     * @param credentials sender account credentials
     * @param messages a list of pairs of receiver account id and message
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     *
     * @return send message operation
     */
    public createMessageOperationUnencrypted(
        credentials: Credentials,
        messages: Array<[ChainObject, string]>,
        fee?: Fee,
    ): Observable<SendMessageOperation> {
        return of(new SendMessageOperation(serialize(MessagePayload.createUnencrypted(credentials.account, messages)), credentials.account, undefined, fee));
    }

    /**
     * Send messages to multiple receivers
     *
     * @param credentials sender account credentials
     * @param messages a list of pairs of receiver account id and message
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     *
     * @return a transaction confirmation
     */
    public send(
        credentials: Credentials,
        messages: Array<[ChainObject, string]>,
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createMessageOperation(credentials, messages, fee).pipe(
            flatMap((operation) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [operation])),
        );
    }

    /**
     * Send unencrypted messages to multiple receivers
     *
     * @param credentials sender account credentials
     * @param messages a list of pairs of receiver account id and message
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     *
     * @return a transaction confirmation
     */
    public sendUnencrypted(
        credentials: Credentials,
        messages: Array<[ChainObject, string]>,
        fee?: Fee,
    ): Observable<TransactionConfirmation> {
        return this.createMessageOperationUnencrypted(credentials, messages, fee).pipe(
            flatMap((operation) => this.api.broadcastApi.broadcastWithCallback(credentials.keyPair, [operation])),
        );
    }

}
