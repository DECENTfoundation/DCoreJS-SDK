import { Expose, Transform, Type } from "class-transformer";

import { Authority } from "./Authority";
import { ChainObject } from "./ChainObject";
import { Options } from "./Options";
import { Publishing } from "./Publishing";

export class Account {

    public static isValidName(name: string): boolean {
        return this.regexp.test(name);
    }

    private static regexp: RegExp = /^(?=.{5,63}$)([a-z][a-z0-9-]+[a-z0-9])(\.[a-z][a-z0-9-]+[a-z0-9])*$/;

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "id" })
    public id: ChainObject;

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "registrar" })
    public registrar: ChainObject;

    @Expose({ name: "name" })
    public name: string;

    @Type(() => Authority)
    @Expose({ name: "owner" })
    public owner: Authority;

    @Type(() => Authority)
    @Expose({ name: "active" })
    public active: Authority;

    @Type(() => Options)
    @Expose({ name: "options" })
    public options: Options;

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "statistics" })
    public statistics: ChainObject;

    @Type(() => Publishing)
    @Expose({ name: "rights_to_publish" })
    public rightsToPublish: Publishing;

    @Expose({ name: "top_n_control_flags" })
    public topControlFlags: number;
}
