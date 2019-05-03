import { plainToClass } from "class-transformer";
import { BlockHeader } from "../../../models/BlockHeader";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetBlockHeader extends BaseRequest<BlockHeader> {
    constructor(
        blockNumber: number,
    ) {
        super(
            ApiGroup.Database,
            "get_block_header",
            [blockNumber],
            (value: object) => plainToClass(BlockHeader, value),
        );
    }
}
