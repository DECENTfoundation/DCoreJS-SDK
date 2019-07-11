import { Expose, Transform, Type } from "class-transformer";
import { Address } from "../crypto/Address";
import { DCoreConstants } from "../DCoreConstants";
import { AddressToClass, AddressToPlain, ChainObjectToClass, ChainObjectToPlain } from "../net/adapter/TypeAdapters";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { VoteId } from "./VoteId";

export class AccountOptions {

    @AddressToPlain
    @AddressToClass
    @Expose({ name: "memo_key" })
    public memoKey: Address;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "voting_account" })
    public votingAccount: ChainObject;

    // UInt16
    @Expose({ name: "num_miner" })
    public numMiner: number;

    @Transform((values: VoteId[]) => values.map((vote) => `${vote.type}:${vote.id}`), { toPlainOnly: true })
    @Transform((values: string[]) => values.map((vote) => VoteId.parse(vote)), { toClassOnly: true })
    @Expose({ name: "votes" })
    public votes: VoteId[];

    @Expose({ name: "extensions" })
    public extensions: any[];

    @Expose({ name: "allow_subscription" })
    public allowSubscription: boolean;

    @Type(() => AssetAmount)
    @Expose({ name: "price_per_subscribe" })
    public pricePerSubscribe: AssetAmount;

    // UInt32
    @Expose({ name: "subscription_period" })
    public subscriptionPeriod: number;

    constructor(publicKey: Address) {
        this.memoKey = publicKey;
        this.votingAccount = DCoreConstants.PROXY_TO_SELF_ACCOUNT_ID;
        this.numMiner = 0;
        this.votes = [];
        this.extensions = [];
        this.allowSubscription = false;
        this.pricePerSubscribe = new AssetAmount();
        this.subscriptionPeriod = 0;
    }
}
