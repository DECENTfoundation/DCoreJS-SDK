import { Expose } from "class-transformer";
import { ChainObjectToClass } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class NftData {
    @ChainObjectToClass
    @Expose({ name: "id" })
    public readonly id: ChainObject;

    @ChainObjectToClass
    @Expose({ name: "nft_id" })
    public readonly nftId: ChainObject;

    @ChainObjectToClass
    @Expose({ name: "owner" })
    public readonly owner: ChainObject;

    @Expose({ name: "data" })
    public readonly data: any[];
}
