import { plainToClass } from "class-transformer";
import * as Long from "long";
import { SignedBlock } from "../../../models/SignedBlock";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetBlock extends BaseRequest<SignedBlock> {
    constructor(
        blockNumber: Long,
    ) {
        super(
            ApiGroup.Database,
            "get_block",
            [blockNumber],
            (value: object) => plainToClass(SignedBlock, value),
        );
    }
}
