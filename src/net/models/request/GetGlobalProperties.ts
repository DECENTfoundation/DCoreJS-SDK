import { plainToClass } from "class-transformer";
import { GlobalProperties } from "../../../models/GlobalProperties";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetGlobalProperties extends BaseRequest<GlobalProperties> {
    constructor() {
        super(
            ApiGroup.Database,
            "get_global_properties",
            [],
            (value: object) => plainToClass(GlobalProperties, value),
        );
    }
}
