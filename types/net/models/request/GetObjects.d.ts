import { ClassType } from "class-transformer/ClassTransformer";
import { ChainObject } from "../../../models/ChainObject";
import { BaseRequest } from "./BaseRequest";
export declare abstract class GetObjects<T> extends BaseRequest<T[]> {
    protected constructor(returnClass: ClassType<T>, objects: ChainObject[]);
}
