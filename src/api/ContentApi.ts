import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DCoreSdk } from "../DCoreSdk";
import { ChainObject } from "../models/ChainObject";
import { Content } from "../models/Content";
import { GetContentById } from "../net/models/request/GetContentById";
import { GetContentByUri } from "../net/models/request/GetContentByUri";

export class ContentApi {

    constructor(private core: DCoreSdk) {
    }

    /**
     * get content
     *
     * @param contentRef uri of the content or object id of the content, 2.13.*
     *
     * @return a content if found, {@link NotFoundError} otherwise
     */
    public getContent(contentRef: ChainObject | string): Observable<Content> {
        if (typeof contentRef === "string") {
            return this.core.request(new GetContentByUri(contentRef));
        } else {
            return this.core.request(new GetContentById(contentRef)).pipe(map((list) => list[0]));
        }
    }

}
