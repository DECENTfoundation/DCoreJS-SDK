import { ChainObject } from "../../../models/ChainObject";
import { Content } from "../../../models/Content";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { GetObjects } from "./GetObjects";

export class GetContentById extends GetObjects<Content> {
    constructor(
        contentId: ChainObject,
    ) {
        super(
            Content,
            [contentId],
        );

        assertThrow(contentId.objectType === ObjectType.ContentObject, () => "not a valid content object id");
    }
}
