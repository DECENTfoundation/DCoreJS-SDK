import { plainToClass } from "class-transformer";
import { DynamicGlobalProperties } from "../../../models/DynamicGlobalProperties";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetDynamicGlobalProps extends BaseRequest<DynamicGlobalProperties> {
    constructor() {
        super(
            ApiGroup.Database,
            "get_dynamic_global_properties",
            [],
            (value: object) => plainToClass(DynamicGlobalProperties, value),
        );
    }
}
