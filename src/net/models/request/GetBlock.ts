import { plainToClass } from "class-transformer";
import { SignedBlock } from "../../../models/SignedBlock";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetBlock extends BaseRequest<SignedBlock> {
    constructor(
        blockNumber: number,
    ) {
        super(
            ApiGroup.Database,
            "get_block",
            [blockNumber],
            (value: object) => plainToClass(SignedBlock, value),
        );
    }
}
