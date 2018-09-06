import { Expose, Transform, Type } from "class-transformer";
import { Address } from "../crypto/Address";
import { DCoreSdk } from "../DCoreSdk";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { VoteId } from "./VoteId";

export class Options {
    @Type(() => Address)
    @Transform((value: string) => Address.parse(value), { toClassOnly: true })
    @Transform((value: Address) => value.encoded, { toPlainOnly: true })
    @Expose({ name: "memo_key" })
    public memoKey: Address;

    @Type(() => ChainObject)
    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "voting_account" })
    public votingAccount: ChainObject;

    @Expose({ name: "num_miner" })
    public numMiner: number;

    @Type(() => VoteId)
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

    @Expose({ name: "subscription_period" })
    public subscriptionPeriod: number;

    constructor(publicKey: Address) {
        this.memoKey = publicKey;
        this.votingAccount = DCoreSdk.PROXY_TO_SELF_ACCOUNT_ID;
        this.numMiner = 0;
        this.votes = [];
        this.extensions = [];
        this.allowSubscription = false;
        this.pricePerSubscribe = new AssetAmount();
        this.subscriptionPeriod = 0;
    }
}
