import { Expose } from "class-transformer";
import * as Long from "long";
import { ChainObjectToClass, ChainObjectToPlain, LongToClass, LongToPlain } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class MinerVotingInfo {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "name" })
    public name: string;

    @Expose({ name: "url" })
    public url: string;

    // UInt64
    @LongToPlain
    @LongToClass
    @Expose({ name: "total_votes" })
    public votes: Long;

    @Expose({ name: "voted" })
    public voted: boolean;
}
