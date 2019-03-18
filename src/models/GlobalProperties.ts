import { Expose, Type } from "class-transformer";
import * as Long from "long";
import { ChainObjectArrayToClass, ChainObjectToClass, LongToClass } from "../utils/TypeAdapters";
import { ChainObject } from "./ChainObject";
import { GlobalParameters } from "./GlobalParameters";

export class GlobalProperties {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @Type(() => GlobalParameters)
    @Expose({ name: "parameters" })
    public parameters: GlobalParameters;

    @LongToClass
    @Expose({ name: "next_available_vote_id" })
    public nextAvailableVoteId: Long;

    @ChainObjectArrayToClass
    @Expose({ name: "active_miners" })
    public activeMiners: ChainObject[];
}
