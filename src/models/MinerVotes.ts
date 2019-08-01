import { Expose } from "class-transformer";
import * as Long from "long";
import { LongToClass, LongToPlain } from "../net/adapter/TypeAdapters";

export class MinerVotes {

    @Expose({ name: "account_name" })
    public account: string;

    // UInt64
    @LongToPlain
    @LongToClass
    @Expose({ name: "votes" })
    public votes: Long;
}
