import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { Nft } from "../../../models/Nft";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetNfts extends BaseRequest<Nft[]> {
    constructor(ids: ChainObject[]) {
        super(
            ApiGroup.Database,
            "get_non_fungible_tokens",
            [ids.map((it) => it.objectId)],
            (value: object[]) => plainToClass(Nft, value),
        );

        assertThrow(ids.every((it) => it.objectType === ObjectType.Nft), () => "not a valid nft object id");
    }
}
