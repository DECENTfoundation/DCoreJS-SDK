import { Expose } from "class-transformer";
import * as Long from "long";
import { LongToClass } from "../net/adapter/TypeAdapters";

export class MinerVotes {

    @Expose({ name: "account_name" })
    public account: string;

    @LongToClass
    @Expose({ name: "votes" })
    public votes: Long;
}
