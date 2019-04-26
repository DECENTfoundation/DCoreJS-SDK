import { plainToClass } from "class-transformer";
import { Purchase } from "../../../models/Purchase";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetOpenBuyings extends BaseRequest<Purchase[]> {
    constructor() {
        super(
            ApiGroup.Database,
            "get_open_buyings",
            [],
            (value: object[]) => plainToClass(Purchase, value),
        );
    }
}
