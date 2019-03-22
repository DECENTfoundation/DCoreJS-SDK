import { plainToClass } from "class-transformer";
import { Purchase } from "../../../models/Purchase";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetOpenBuyingsByUri extends BaseRequest<Purchase[]> {
    constructor(uri: string) {
        super(
            ApiGroup.Database,
            "get_open_buyings_by_URI",
            [uri],
            (value: object[]) => plainToClass(Purchase, value),
        );
    }
}
