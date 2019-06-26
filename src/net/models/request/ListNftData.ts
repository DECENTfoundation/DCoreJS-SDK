import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { NftData } from "../../../models/NftData";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class ListNftData extends BaseRequest<NftData[]> {

    constructor(nftId: ChainObject) {
        super(
            ApiGroup.Database,
            "list_non_fungible_token_data",
            [nftId.objectId],
            (value: object[]) => plainToClass(NftData, value),
        );

        assertThrow(nftId.objectType === ObjectType.Nft, () => "not a valid nft object id");
    }
}
