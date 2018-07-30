import { Exclude } from "class-transformer";
import { Point } from "ecurve";
import * as _ from "lodash/fp";
import { requireThrow, Utils } from "../utils/Utils";
import { ECKeyPair } from "./ECKeyPair";

export class Address {

    public static parse(value: string): Address {
        return new Address(this.decode(value), value);
    }

    private static PREFIX: string = "DCT";

    private static decode(address: string): Point {
        const decoded = new Buffer(Utils.Base58.decode(address.slice(3, address.length)));
        const data = decoded.slice(0, decoded.length - 4);
        const cks = decoded.slice(decoded.length - 4, decoded.length);
        const key = ECKeyPair.decodePublicKey(data);
        const cksActual = Utils.ripemd160(key.getEncoded(true)).slice(0, 4);
        requireThrow(_.isEqual(cks, cksActual), () => "checksum not valid for:" + address);
        return key;
    }

    /**
     * the public key is always in a compressed format in DCore
     */
    private static encode(publicKey: Point): string {
        const data = publicKey.getEncoded(true);
        const cks = Utils.ripemd160(data).slice(0, 4);
        return Address.PREFIX + Utils.Base58.encode(Buffer.concat([data, cks]));
    }

    @Exclude()
    public readonly publicKey: Point;

    @Exclude()
    public readonly encoded: string;

    public constructor(publicKey: Point, encoded?: string) {
        this.publicKey = publicKey;
        this.encoded = _.isNil(encoded) ? Address.encode(publicKey) : encoded;
    }
}
