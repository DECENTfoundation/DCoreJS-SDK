import { Expose } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class NftOptions {
    @Expose({ name: "issuer" })
    @ChainObjectToPlain
    @ChainObjectToClass
    public readonly issuer: ChainObject;

    // UInt32
    @Expose({ name: "max_supply" })
    public readonly maxSupply: number;

    @Expose({ name: "fixed_max_supply" })
    public readonly fixedMaxSupply: boolean;

    @Expose({ name: "description" })
    public readonly description: string;

    constructor(issuer: ChainObject, maxSupply: number, fixedMaxSupply: boolean, description: string) {
        this.issuer = issuer;
        this.maxSupply = maxSupply;
        this.fixedMaxSupply = fixedMaxSupply;
        this.description = description;
    }
}
