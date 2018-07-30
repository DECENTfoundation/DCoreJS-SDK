import * as BigInteger from "bigi";
import { getCurveByName, Point } from "ecurve";
import * as _ from "lodash/fp";
import { ObjectCheckOf } from "../utils/ObjectCheckOf";
import { requireThrow, Utils } from "../utils/Utils";

export class ECKeyPair {
    public static decodePublicKey(bytes: Buffer): Point {
        return Point.decodeFrom(this.secp256k1, bytes);
    }

    public static parseWif(base58: string): ECKeyPair {
        let data = new Buffer(Utils.Base58.decode(base58));
        requireThrow(data.length > 4, () => "input too short");
        const checksum = data.slice(data.length - 4, data.length);
        data = data.slice(0, data.length - 4);
        requireThrow(data[0] === this.VERSION, () => `${data[0]} is not a valid private key version byte`);
        const actualChecksum = Utils.hashTwice256(data).slice(0, 4);
        requireThrow(_.isEqual(actualChecksum, checksum), () => "checksum not valid");
        data = data.slice(1, data.length);
        if (data.length === 33 && data[32] === 1) {
            return new ECKeyPair(data.slice(0, data.length - 1), null, true);
        } else {
            return new ECKeyPair(data, null, false);
        }
    }

    private static VERSION: number = 0x80;
    private static secp256k1 = getCurveByName("secp256k1");

    public readonly privateKey?: BigInteger;
    public readonly publicKey: Point;
    private compressed?: boolean;

    private constructor(privateKey?: BigInteger | Buffer, publicKey?: Point, compressed?: boolean = true) {
        this.privateKey = ObjectCheckOf<BigInteger>(privateKey, "") ? privateKey : BigInteger.fromBuffer(privateKey);
        this.publicKey = _.isNil(publicKey) ? ECKeyPair.secp256k1.G.multiply(this.privateKey) : publicKey;
        this.compressed = compressed;
    }

}
