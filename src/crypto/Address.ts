import { Exclude } from "class-transformer";
import * as _ from "lodash/fp";
import { requireThrow, Utils } from "../utils/Utils";

export class Address {

    public static parse(value: string): Address {
        return new Address(this.decode(value), value);
    }

    private static PREFIX: string = "DCT";

    private static decode(address: string): Buffer {
        const decoded = new Buffer(Utils.Base58.decode(address.slice(3, address.length)));
        const key = decoded.slice(0, decoded.length - 4);
        const cks = decoded.slice(decoded.length - 4, decoded.length);
        const cksActual = Utils.ripemd160(key).slice(0, 4);
        requireThrow(_.isEqual(cks, cksActual), () => "checksum not valid for:" + address);
        return key;
    }

    private static encode(publicKey: Buffer): string {
        const cks = Utils.ripemd160(publicKey).slice(0, 4);
        return Address.PREFIX + Utils.Base58.encode(Buffer.concat([publicKey, cks]));
    }

    @Exclude()
    public readonly publicKey: Buffer;

    @Exclude()
    public readonly encoded: string;

    public constructor(publicKey: Buffer, encoded?: string) {
        this.publicKey = publicKey;
        this.encoded = _.isNil(encoded) ? Address.encode(publicKey) : encoded;
    }
}
