import { Observable } from "rxjs";
import { ECKeyPair } from "./crypto/ECKeyPair";
import { AssetAmount } from "./models/AssetAmount";
import { Authority } from "./models/Authority";
import { ChainObject } from "./models/ChainObject";
import { Content } from "./models/Content";
import { Options } from "./models/Options";
import { TransactionConfirmation } from "./models/TransactionConfirmation";

export abstract class DCoreApiRxImpl {

    /**
     * make a transfer
     *
     * @param keyPair private keys
     * @param from object id of the sender account, 1.2.*
     * @param to object id of the receiver account, 1.2.*
     * @param amount amount to send with asset type
     * @param memo optional message
     * @param encrypted encrypted is visible only for sender and receiver, unencrypted is visible publicly
     *
     * @return a transaction confirmation
     */
    public abstract transfer(
        keyPair: ECKeyPair,
        from: ChainObject,
        to: ChainObject,
        amount: AssetAmount,
        memo?: string,
        encrypted?: boolean,
    ): Observable<TransactionConfirmation>;

    /**
     * buy a content
     *
     * @param keyPair private keys
     * @param content
     * @param consumer object id of the consumer account, 1.2.*
     *
     * @return a transaction confirmation
     */
    public abstract buyContent(
        keyPair: ECKeyPair,
        content: Content,
        consumer: ChainObject,
    ): Observable<TransactionConfirmation>;

    /**
     * vote for miner
     *
     * @param keyPair private keys
     * @param accountId account id
     * @param voteIds list of miner vote ids
     *
     * @return a transaction confirmation
     */
    public abstract voteForMiners(
        keyPair: ECKeyPair,
        accountId: ChainObject,
        voteIds: string[],
    ): Observable<TransactionConfirmation>;

    /**
     * Creates new account
     *
     * @param keyPair private keys
     * @param registrar account id of user registering a new account
     * @param name user name of the new account
     * @param owner public keys
     * @param active public keys
     * @param options user options
     *
     * @return a transaction confirmation
     */
    public abstract createAccount(
        keyPair: ECKeyPair,
        registrar: ChainObject,
        name: string,
        owner: Authority,
        active: Authority,
        options: Options,
    ): Observable<TransactionConfirmation>;

}
