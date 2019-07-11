import { Expose, Type } from "class-transformer";
import { Address } from "../crypto/Address";
import { ChainObjectToClass, ChainObjectToPlain } from "../net/adapter/TypeAdapters";
import { AccountOptions } from "./AccountOptions";
import { Authority } from "./Authority";
import { ChainObject } from "./ChainObject";
import { Publishing } from "./Publishing";

export class Account {

    public static isValidName(name: string): boolean {
        return this.regexp.test(name);
    }

    private static regexp: RegExp = /^(?=.{5,63}$)([a-z][a-z0-9-]+[a-z0-9])(\.[a-z][a-z0-9-]+[a-z0-9])*$/;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @ChainObjectToPlain
    @ChainObjectToClass
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

    @Type(() => AccountOptions)
    @Expose({ name: "options" })
    public options: AccountOptions;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "statistics" })
    public statistics: ChainObject;

    @Type(() => Publishing)
    @Expose({ name: "rights_to_publish" })
    public rightsToPublish: Publishing;

    // UInt8
    @Expose({ name: "top_n_control_flags" })
    public topControlFlags: number;

    public get primaryAddress(): Address {
        return this.active.keyAuths[0].value;
    }
}
