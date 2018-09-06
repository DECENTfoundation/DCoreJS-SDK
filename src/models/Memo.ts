import { Expose, Transform, Type } from "class-transformer";
import * as _ from "lodash/fp";
import { Address } from "../crypto/Address";
import { Utils } from "../utils/Utils";

export class Memo {
    public static create(message: string): Memo {
        return new Memo("0000" + Utils.Base16.encode(new Buffer(message)));
    }

    @Type(() => Address)
    @Transform((value: string) => Address.parse(value), { toClassOnly: true })
    @Transform((value?: Address) => _.isNil(value) ? value : value.encoded, { toPlainOnly: true })
    @Expose({ name: "from" })
    public from?: Address;

    @Type(() => Address)
    @Transform((value: string) => Address.parse(value), { toClassOnly: true })
    @Transform((value?: Address) => _.isNil(value) ? value : value.encoded, { toPlainOnly: true })
    @Expose({ name: "to" })
    public to?: Address;

    @Expose({ name: "message" })
    public message: string;

    @Expose({ name: "nonce" })
    public nonce: number;

    private constructor(message: string, from?: Address, to?: Address, nonce: number = 0) {
        this.from = from;
        this.to = to;
        this.message = message;
        this.nonce = nonce;
    }
}
