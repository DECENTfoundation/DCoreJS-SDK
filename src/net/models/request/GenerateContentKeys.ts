import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { ContentKeys } from "../../../models/ContentKeys";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GenerateContentKeys extends BaseRequest<ContentKeys> {
    constructor(seeders: ChainObject[]) {
        super(
            ApiGroup.Database,
            "generate_content_keys",
            [seeders.map((value) => value.objectId)],
            (value: object) => plainToClass(ContentKeys, value),
        );

        assertThrow(seeders.every((id) => id.objectType === ObjectType.Account), () => "not a valid account object id");
    }
}
