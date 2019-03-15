import { plainToClass } from "class-transformer";
import * as Long from "long";
import { BlockHeader } from "../../../models/BlockHeader";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetBlockHeader extends BaseRequest<BlockHeader> {
    constructor(
        blockNumber: Long,
    ) {
        super(
            ApiGroup.Database,
            "get_block_header",
            [blockNumber],
            (value: object) => plainToClass(BlockHeader, value),
        );
    }
}
