import { ChainObject } from "../../../models/ChainObject";
import { Content } from "../../../models/Content";
import { GetObjects } from "./GetObjects";
export declare class GetContentById extends GetObjects<Content> {
    constructor(contentId: ChainObject);
}
