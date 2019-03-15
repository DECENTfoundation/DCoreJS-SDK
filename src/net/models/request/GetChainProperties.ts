import { plainToClass } from "class-transformer";
import { ChainProperties } from "../../../models/ChainProperties";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetChainProperties extends BaseRequest<ChainProperties> {
    constructor() {
        super(
            ApiGroup.Database,
            "get_chain_properties",
            [],
            (value: object) => plainToClass(ChainProperties, value),
        );
    }
}
