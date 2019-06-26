import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { NftData } from "../../../models/NftData";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetNftData extends BaseRequest<NftData[]> {
    constructor(ids: ChainObject[]) {
        super(
            ApiGroup.Database,
            "get_non_fungible_token_data",
            [ids.map((it) => it.objectId)],
            (value: object[]) => plainToClass(NftData, value),
        );

        assertThrow(ids.every((it) => it.objectType === ObjectType.NftData), () => "not a valid nft data object id");
    }
}
