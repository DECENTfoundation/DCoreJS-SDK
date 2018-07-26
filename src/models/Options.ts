import { Expose, Transform, Type } from "class-transformer";
import { Address } from "../crypto/Address";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { VoteId } from "./VoteId";

export class Options {
    @Type(() => Address)
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
    @Transform((value: string) => VoteId.parse(value), { toClassOnly: true })
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
}
