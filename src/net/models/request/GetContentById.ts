import { ChainObject } from "../../../models/ChainObject";
import { Content } from "../../../models/Content";
import { GetObjects } from "./GetObjects";

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
