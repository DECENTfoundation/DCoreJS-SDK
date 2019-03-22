import { Expose, Type } from "class-transformer";
import { ChainObjectToClass } from "../utils/TypeAdapters";
import { ChainObject } from "./ChainObject";
import { ChainParameters } from "./ChainParameters";

export class ChainProperties {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "chain_id" })
    public chainId: string;

    @Type(() => ChainParameters)
    @Expose({ name: "immutable_parameters" })
    public parameters: ChainParameters;
}
