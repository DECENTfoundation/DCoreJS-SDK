import { Exclude } from "class-transformer";
import { Point } from "ecurve";
import { BaseUtils } from "../utils/BaseUtils";
import { ECKeyPair } from "./ECKeyPair";

export class Address {

    // private static PREFIX: string = "DCT";

    public static parse(value: string): Address {
        return new Address(value);
    }

    @Exclude()
    public readonly publicKey: Point;

    @Exclude()
    public readonly encoded: string;

    private constructor(encoded: string) {
        this.encoded = encoded;
        this.publicKey = this.decode(encoded);
    }

    public encode(): string {
        return this.encoded;
    }

    private decode(address: string): Point {
        const decoded = BaseUtils["58"].decode(address.slice(3, address.length));
        const key = decoded.slice(0, decoded.length - 4);
        // const cks = decoded.slice(decoded.length - 4, decoded.length);
        return ECKeyPair.decodePublicKey(new Buffer(key));
    }

    /*
        constructor(
            public publicKey: ECPoint,
            private prefix: string = Address.PREFIX,
        ) { }

    */
}
