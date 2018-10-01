/// <reference types="node" />
import { ObjectType } from "./ObjectType";
export declare class ChainObject {
    static parse(id: string): ChainObject;
    private static regexp;
    readonly objectType: ObjectType;
    readonly instance: number;
    readonly fullBytes: Buffer;
    readonly objectId: string;
    constructor(objectId: string | ObjectType);
}
