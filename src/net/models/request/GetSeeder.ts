import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { Seeder } from "../../../models/Seeder";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetSeeder extends BaseRequest<Seeder> {
    constructor(
        seederId: ChainObject,
    ) {
        super(
            ApiGroup.Database,
            "get_seeder",
            [seederId.objectId],
            (value: object) => plainToClass(Seeder, value),
        );
    }
}
