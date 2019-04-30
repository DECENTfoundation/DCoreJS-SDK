import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { ChainObject } from "../../../models/ChainObject";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetObjects<T> extends BaseRequest<T[]> {
    constructor(returnClass: ClassType<T>, objects: ChainObject[]) {
        super(
            ApiGroup.Database,
            "get_objects",
            [objects.map((value) => value.objectId)],
            (value: object[]) => plainToClass(returnClass, value),
        );
    }
}
