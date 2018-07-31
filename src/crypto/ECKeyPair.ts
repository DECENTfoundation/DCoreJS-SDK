import * as _ from "lodash/fp";
import { publicKeyCreate, sign } from "secp256k1";
import { requireThrow, Utils } from "../utils/Utils";

export class ECKeyPair {

    public static parseWif(base58: string): ECKeyPair {
        let data = new Buffer(Utils.Base58.decode(base58));
        requireThrow(data.length > 4, () => "input too short");
        const checksum = data.slice(data.length - 4, data.length);
        data = data.slice(0, data.length - 4);
        requireThrow(data[0] === this.VERSION, () => `${data[0]} is not a valid private key version byte`);
        const actualChecksum = Utils.hashTwice256(data).slice(0, 4);
        requireThrow(_.isEqual(actualChecksum, checksum), () => "checksum not valid");
        // drop version byte
        data = data.slice(1, data.length);
        // check compressed byte and drop if true
        data = data.length === 33 && data[32] === 1 ? data.slice(0, data.length - 1) : data;
        return new ECKeyPair(data);
    }

    private static VERSION: number = 0x80;
    private static COMPRESSED: number = 4;
    private static COMPACT: number = 27;

    public readonly privateKey: Buffer;
    public readonly publicKey: Buffer;

    /**
     * the public key is always in a compressed format in DCore
     */
    private constructor(privateKey: Buffer) {
        this.privateKey = privateKey;
        this.publicKey = publicKeyCreate(this.privateKey, true);
    }

    public sign(data: Buffer): string | undefined {
        const sig = sign(Utils.hash256(data), this.privateKey);
        const head = Buffer.alloc(1, sig.recovery + ECKeyPair.COMPRESSED + ECKeyPair.COMPACT);
        const sigData = Buffer.concat([head, sig.signature]);
        // tslint:disable:no-bitwise
        if ((sigData[0] & 0x80) !== 0 || sigData[0] === 0 ||
            (sigData[1] & 0x80) !== 0 ||
            (sigData[32] & 0x80) !== 0 || sigData[32] === 0 ||
            (sigData[33] & 0x80) !== 0) {
            return;
        } else {
            return Utils.Base16.encode(sigData);
        }
    }
}
