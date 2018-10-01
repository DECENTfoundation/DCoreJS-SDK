import { Authority } from "./Authority";
import { ChainObject } from "./ChainObject";
import { Options } from "./Options";
import { Publishing } from "./Publishing";
export declare class Account {
    id: ChainObject;
    registrar: ChainObject;
    name: string;
    owner: Authority;
    active: Authority;
    options: Options;
    statistics: ChainObject;
    rightsToPublish: Publishing;
    topControlFlags: number;
}
