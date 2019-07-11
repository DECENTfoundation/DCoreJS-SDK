import { Expose, Type } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";
import { ChainParameters } from "./ChainParameters";

export class ChainProperties {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "chain_id" })
    public chainId: string;

    @Type(() => ChainParameters)
    @Expose({ name: "immutable_parameters" })
    public parameters: ChainParameters;
}
