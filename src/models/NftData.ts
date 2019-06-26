import { Expose } from "class-transformer";
import { ChainObject } from "./ChainObject";

export class NftData {
    @Expose({ name: "id" })
    public readonly id: ChainObject;

    @Expose({ name: "nft_id" })
    public readonly nftId: ChainObject;

    @Expose({ name: "owner" })
    public readonly owner: ChainObject;

    @Expose({ name: "data" })
    public readonly data?: object[];
}
