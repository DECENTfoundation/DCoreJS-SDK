import { plainToClass } from "class-transformer";
import { Nft } from "../../../models/Nft";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class ListNfts extends BaseRequest<Nft[]> {

    constructor(
        lowerBound: string,
        limit: number = 100,
    ) {
        super(
            ApiGroup.Database,
            "list_non_fungible_tokens",
            [lowerBound, limit],
            (value: object[]) => plainToClass(Nft, value),
        );
    }
}
