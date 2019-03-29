import { plainToClass } from "class-transformer";
import { Regions } from "../../../models/Regions";
import { Seeder } from "../../../models/Seeder";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class ListSeedersByRegion extends BaseRequest<Seeder[]> {
    constructor(
        region: Regions = Regions.All,
    ) {
        super(
            ApiGroup.Database,
            "list_seeders_by_upload",
            [region],
            (value: object[]) => plainToClass(Seeder, value),
        );
    }
}
