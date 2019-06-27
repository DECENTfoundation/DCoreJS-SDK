import { Expose } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../net/adapter/TypeAdapters";
import { assertThrow } from "../utils/Utils";
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

    public update(maxSupply?: number, fixedMaxSupply?: boolean, description?: string): NftOptions {
        const opts = new NftOptions(
            this.issuer,
            maxSupply ? maxSupply : this.maxSupply,
            fixedMaxSupply ? fixedMaxSupply : this.fixedMaxSupply,
            description ? description : this.description,
        );

        assertThrow(opts.maxSupply >= this.maxSupply, () => "Max supply must be at least ${this.maxSupply}");
        assertThrow(opts.fixedMaxSupply === this.fixedMaxSupply || !this.fixedMaxSupply, () => "Max supply must remain fixed");
        assertThrow(opts.maxSupply === this.maxSupply || !this.fixedMaxSupply, () => "Can not change max supply (it's fixed)");
        assertThrow(!this.eq(opts), () => "no new values to update");

        return opts;
    }

    private eq(other: NftOptions) {
        return other.maxSupply === this.maxSupply && other.fixedMaxSupply === this.fixedMaxSupply && other.description === this.description;
    }

}
