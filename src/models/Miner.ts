import { Expose, Transform } from "class-transformer";
import * as Long from "long";
import { Address } from "../crypto/Address";
import { AddressToClass, AddressToPlain, ChainObjectToClass, ChainObjectToPlain, LongToClass, LongToClassSigned, LongToPlain } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";
import { VoteId } from "./VoteId";

export class Miner {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "miner_account" })
    public minerAccount: ChainObject;

    // UInt64
    @LongToPlain
    @LongToClass
    @Expose({ name: "last_aslot" })
    public lastAslot: Long;

    @AddressToPlain
    @AddressToClass
    @Expose({ name: "signing_key" })
    public signingKey: Address;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "pay_vb" })
    public payVb: ChainObject;

    @Transform((value: any, obj: Miner) => obj.voteId.toString(), { toPlainOnly: true })
    @Transform((value: string) => VoteId.parse(value), { toClassOnly: true })
    @Expose({ name: "vote_id" })
    public voteId: VoteId;

    // UInt64
    @LongToPlain
    @LongToClass
    @Expose({ name: "total_votes" })
    public totalVotes: Long;

    @Expose({ name: "url" })
    public url: string;

    // Int64
    @LongToPlain
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
