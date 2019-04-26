import { plainToClass } from "class-transformer";
import { Content } from "../../../models/Content";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetContentByUri extends BaseRequest<Content> {
    constructor(
        uri: string,
    ) {
        super(
            ApiGroup.Database,
            "get_content",
            [uri],
            (value: object) => plainToClass(Content, value),
        );
    }
}
