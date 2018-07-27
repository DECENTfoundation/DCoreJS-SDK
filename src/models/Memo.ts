import { Expose, Type } from "class-transformer";
import { Address } from "../crypto/Address";
import { BaseUtils } from "../utils/BaseUtils";

export class Memo {
    @Type(() => Address)
    @Expose({ name: "from" })
    public from?: Address;

    @Type(() => Address)
    @Expose({ name: "to" })
    public to?: Address;

    @Expose({ name: "message" })
    public message: string;

    @Expose({ name: "nonce" })
    public nonce: number = 0;

    constructor(message: string) {
        this.message = "0000" + BaseUtils["16"].encode(new Buffer(message));
    }
}
