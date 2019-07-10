import { Expose, Type } from "class-transformer";
import { ChainObjectArrayToClass, ChainObjectToClass } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";
import { GlobalParameters } from "./GlobalParameters";

export class GlobalProperties {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @Type(() => GlobalParameters)
    @Expose({ name: "parameters" })
    public parameters: GlobalParameters;

    // UInt32
    @Expose({ name: "next_available_vote_id" })
    public nextAvailableVoteId: number;

    @ChainObjectArrayToClass
    @Expose({ name: "active_miners" })
    public activeMiners: ChainObject[];
}
