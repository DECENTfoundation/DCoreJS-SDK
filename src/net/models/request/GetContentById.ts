import { ChainObject } from "../../../models/ChainObject";
import { Content } from "../../../models/Content";
import { GetObjects } from "./GetObjects";

// array
export class GetContentById extends GetObjects<Content> {
    constructor(
        contentId: ChainObject,
    ) {
        super(
            Content,
            [contentId],
        );
    }
}
