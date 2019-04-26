import { plainToClass } from "class-transformer";
import { Seeder } from "../../../models/Seeder";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class ListSeedersByPrice extends BaseRequest<Seeder[]> {
    constructor(
        count: number = 100,
    ) {
        super(
            ApiGroup.Database,
            "list_seeders_by_price",
            [count],
            (value: object[]) => plainToClass(Seeder, value),
        );
    }
}
