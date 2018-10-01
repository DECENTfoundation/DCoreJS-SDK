import { Address } from "../crypto/Address";
import { ChainObject } from "./ChainObject";
export declare class Miner {
    id: ChainObject;
    minerAccount: ChainObject;
    lastAslot: number;
    signingKey: Address;
    payVb: ChainObject;
    voteId: string;
    totalVotes: number;
    url: string;
    totalMissed: number;
    lastConfirmedBlockNum: number;
}
