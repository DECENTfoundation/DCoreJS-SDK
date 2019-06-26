import { Expose } from "class-transformer";
import { ChainObject } from "./ChainObject";
import { NftDataType } from "./NftDataType";
import { NftOptions } from "./NftOptions";

export class Nft {
    @Expose({ name: "id" })
    public readonly id: ChainObject;

    @Expose({ name: "symbol" })
    public readonly symbol: string;

    @Expose({ name: "options" })
    public readonly options: NftOptions;

    @Expose({ name: "definitions" })
    public readonly definitions: NftDataType[];

    @Expose({ name: "fixed_max_supply" })
    public readonly fixedMaxSupply: boolean;

    @Expose({ name: "transferable" })
    public readonly transferable: boolean;

    // UInt32
    @Expose({ name: "current_supply" })
    public readonly currentSupply: number;
}
