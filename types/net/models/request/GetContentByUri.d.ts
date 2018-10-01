import { Content } from "../../../models/Content";
import { BaseRequest } from "./BaseRequest";
export declare class GetContentByUri extends BaseRequest<Content> {
    constructor(uri: string);
}
