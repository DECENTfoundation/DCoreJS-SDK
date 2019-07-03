import { plainToClass } from "class-transformer";
import { Nft } from "../../../models/Nft";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetNftsBySymbol extends BaseRequest<Nft[]> {
    constructor(symbols: string[]) {
        super(
            ApiGroup.Database,
            "get_non_fungible_tokens_by_symbols",
            [symbols],
            (value: object[]) => plainToClass(Nft, value),
        );
    }
}
