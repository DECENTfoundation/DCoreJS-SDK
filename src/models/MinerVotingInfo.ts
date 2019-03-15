import { Expose } from "class-transformer";
import * as Long from "long";
import { ChainObjectToClass, LongToClass } from "../utils/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class MinerVotingInfo {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "name" })
    public name: string;

    @Expose({ name: "url" })
    public url: string;

    @LongToClass
    @Expose({ name: "total_votes" })
    public votes: Long;

    @Expose({ name: "voted" })
    public voted: boolean;
}
