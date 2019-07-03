import { ChainObject } from "../../../models/ChainObject";
import { NftData, NftDataRaw } from "../../../models/NftData";
import { ObjectType } from "../../../models/ObjectType";
import { RawNft } from "../../../models/RawNft";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetNftData extends BaseRequest<Array<NftData<RawNft>>> {
    constructor(ids: ChainObject[]) {
        super(
            ApiGroup.Database,
            "get_non_fungible_token_data",
            [ids.map((it) => it.objectId)],
            (value: NftDataRaw[]) => value.map((it) =>
                new NftData(ChainObject.parse(it.id), ChainObject.parse(it.nft_id), ChainObject.parse(it.owner), new RawNft(it.data))),
        );

        assertThrow(ids.every((it) => it.objectType === ObjectType.NftData), () => "not a valid nft data object id");
    }
}
