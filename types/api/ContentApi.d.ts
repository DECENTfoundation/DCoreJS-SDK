import { Observable } from "rxjs";
import { DCoreSdk } from "../DCoreSdk";
import { ChainObject } from "../models/ChainObject";
import { Content } from "../models/Content";
export declare class ContentApi {
    private core;
    constructor(core: DCoreSdk);
    /**
     * get content
     *
     * @param contentRef uri of the content or object id of the content, 2.13.*
     *
     * @return a content if found, {@link NotFoundError} otherwise
     */
    getContent(contentRef: ChainObject | string): Observable<Content>;
}
