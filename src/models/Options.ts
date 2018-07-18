import { Expose, Type } from "class-transformer";
import { Address } from "../crypto/Address";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";

export class Options {
    @Type(() => Address)
    @Expose({ name: "memo_key" })
    public memoKey: Address;

    @Type(() => ChainObject)
    @Expose({ name: "voting_account" })
    public votingAccount: ChainObject;

    @Expose({ name: "num_miner" })
    public numMiner: number;

    @Expose({ name: "votes" })
    public votes: string[];

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
