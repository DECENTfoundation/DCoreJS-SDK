import { Address } from "../crypto/Address";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { VoteId } from "./VoteId";
export declare class Options {
    memoKey: Address;
    votingAccount: ChainObject;
    numMiner: number;
    votes: VoteId[];
    extensions: any[];
    allowSubscription: boolean;
    pricePerSubscribe: AssetAmount;
    subscriptionPeriod: number;
    constructor(publicKey: Address);
}
