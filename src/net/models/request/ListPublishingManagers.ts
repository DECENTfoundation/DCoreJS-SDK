import { ChainObject } from "../../../models/ChainObject";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class ListPublishingManagers extends BaseRequest<ChainObject[]> {
    constructor(lowerBound: string, limit: number = 100) {
        super(
            ApiGroup.Database,
            "list_publishing_managers",
            [lowerBound, limit],
            (value: string[]) => value.map((id) => ChainObject.parse(id)),
        );
    }
}
