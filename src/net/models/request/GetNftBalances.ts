import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { NftData } from "../../../models/NftData";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetNftBalances extends BaseRequest<NftData[]> {
    constructor(account: ChainObject, ids: ChainObject[] = []) {
        super(
            ApiGroup.Database,
            "get_non_fungible_token_balances",
            [account.objectId, ids.map((it) => it.objectId)],
            (value: object[]) => plainToClass(NftData, value),
        );

        assertThrow(account.objectType === ObjectType.Account, () => "not a valid account object id");
        assertThrow(ids.every((it) => it.objectType === ObjectType.NftData), () => "not a valid nft data object id");
    }
}
