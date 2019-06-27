import { Expose, Type } from "class-transformer";
import { ChainObjectToClass } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";
import { NftDataType } from "./NftDataType";
import { NftModifiableBy } from "./NftModifiableBy";
import { NftOptions } from "./NftOptions";

export class Nft {
    public static createUpdate(definitions: NftDataType[], values: any[]): Map<string, any> {
        return new Map(definitions
            .map((it, idx) => [it, idx] as [NftDataType, number])
            .filter(([it, idx]) => it.modifiable !== NftModifiableBy.Nobody)
            .map(([it, idx]) => [it.name, values[idx]] as [string, any]));
    }

    @ChainObjectToClass
    @Expose({ name: "id" })
    public readonly id: ChainObject;

    @Expose({ name: "symbol" })
    public readonly symbol: string;

    @Type(() => NftOptions)
    @Expose({ name: "options" })
    public readonly options: NftOptions;

    @Type(() => NftDataType)
    @Expose({ name: "definitions" })
    public readonly definitions: NftDataType[];

    @Expose({ name: "fixed_max_supply" })
    public readonly fixedMaxSupply: boolean;

    @Expose({ name: "transferable" })
    public readonly transferable: boolean;

    // UInt32
    @Expose({ name: "current_supply" })
    public readonly currentSupply: number;

    public createUpdate(values: any[]): Map<string, any> {
        return Nft.createUpdate(this.definitions, values);
    }
}
