import { Expose, Transform, Type } from "class-transformer";
import { Address } from "../crypto/Address";
import { ChainObject } from "./ChainObject";

export class Miner {
    @Type(() => ChainObject)
    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "id" })
    public id: ChainObject;

    @Type(() => ChainObject)
    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "miner_account" })
    public minerAccount: ChainObject;

    @Expose({ name: "last_aslot" })
    public lastAslot: number;

    @Type(() => Address)
    @Transform((value: string) => Address.parse(value), { toClassOnly: true })
    @Transform((value: Address) => value.encode(), { toPlainOnly: true })
    @Expose({ name: "signing_key" })
    public signingKey: Address;

    @Type(() => ChainObject)
    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "pay_vb" })
    public payVb: ChainObject;

    @Expose({ name: "vote_id" })
    public voteId: string;

    @Expose({ name: "total_votes" })
    public totalVotes: number;

    @Expose({ name: "url" })
    public url: string;

    @Expose({ name: "total_missed" })
    public totalMissed: number;

    @Expose({ name: "last_confirmed_block_num" })
    public lastConfirmedBlockNum: number;
}
