import { Expose } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class NftData<T> {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "id" })
    public readonly id: ChainObject;

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "nft_id" })
    public readonly nftId: ChainObject;

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "owner" })
    public readonly owner: ChainObject;

    @Expose({ name: "data" })
    public readonly data: T;

    constructor(id: ChainObject, nftId: ChainObject, owner: ChainObject, data: T) {
        this.id = id;
        this.nftId = nftId;
        this.owner = owner;
        this.data = data;
    }
}

export interface NftDataRaw {
    id: string;
    nft_id: string;
    owner: string;
    data: any[];
}
