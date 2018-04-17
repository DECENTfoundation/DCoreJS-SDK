import { Expose } from "class-transformer";

import { Authority } from "./Authority";
import { ChainObject } from "./ChainObject";

export class Account {

    public id: ChainObject;
    public registrar: ChainObject;
    public name: string;
    public owner: Authority;
    public active: Authority;
    public options: Options;
    public statistics: ChainObject;

    @Expose({ name: "rights_to_publish" })
    public rightsToPublish: Publishing,

    @Expose({ name: "top_n_control_flags" })
    public topControlFlags: number;

    public a: Uint8Array;
}
