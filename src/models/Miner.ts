import { Expose, Transform } from "class-transformer";
import * as Long from "long";
import { Address } from "../crypto/Address";
import { AddressToClass, ChainObjectToClass, LongToClass, LongToClassSigned } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";
import { VoteId } from "./VoteId";

export class Miner {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @ChainObjectToClass
    @Expose({ name: "miner_account" })
    public minerAccount: ChainObject;

    // UInt64
    @LongToClass
    @Expose({ name: "last_aslot" })
    public lastAslot: Long;

    @AddressToClass
    @Expose({ name: "signing_key" })
    public signingKey: Address;

    @ChainObjectToClass
    @Expose({ name: "pay_vb" })
    public payVb: ChainObject;

    @Transform((value: string) => VoteId.parse(value))
    @Expose({ name: "vote_id" })
    public voteId: VoteId;

    // UInt64
    @LongToClass
    @Expose({ name: "total_votes" })
    public totalVotes: Long;

    @Expose({ name: "url" })
    public url: string;

    // Int64
    @LongToClassSigned
    @Expose({ name: "total_missed" })
    public totalMissed: Long;

    // UInt32
    @Expose({ name: "last_confirmed_block_num" })
    public lastConfirmedBlockNum: number;

    // UInt32
    @Expose({ name: "vote_ranking" })
    public voteRanking: number;
}
