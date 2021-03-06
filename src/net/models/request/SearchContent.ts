import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { ContentSummary } from "../../../models/ContentSummary";
import { ObjectType } from "../../../models/ObjectType";
import { SearchContentOrder } from "../../../models/order/SearchContentOrder";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class SearchContent extends BaseRequest<ContentSummary[]> {
    constructor(
        searchTerm: string,
        order: SearchContentOrder = SearchContentOrder.CreatedDesc,
        user: string,
        regionCode: string,
        type: string,
        startId: ChainObject = ObjectType.Null.genericId(),
        limit: number = 100,
    ) {
        super(
            ApiGroup.Database,
            "search_content",
            [searchTerm, order, user, regionCode, type, startId.objectId, limit],
            (value: object[]) => plainToClass(ContentSummary, value),
        );

        assertThrow(startId.objectType === ObjectType.ContentObject || startId.objectType === ObjectType.Null, () => "not a valid content object id");
    }
}
