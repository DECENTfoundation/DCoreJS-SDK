import * as Crypto from "crypto";
import * as _ from "lodash/fp";
import * as Long from "long";
import { privateKeyVerify, publicKeyCreate, publicKeyTweakMul, sign } from "secp256k1";
import { assertThrow, Utils } from "../utils/Utils";
import { Address } from "./Address";
import { Passphrase } from "./Passphrase";
import { Wif } from "./Wif";

export class ECKeyPair {

    public static parseWif(base58: string): ECKeyPair {
        let data = Buffer.from(Utils.Base58.decode(base58));
        assertThrow(data.length > 4, () => "input too short");
        const checksum = data.slice(data.length - 4, data.length);
        data = data.slice(0, data.length - 4);
        assertThrow(data[0] === this.VERSION, () => `${data[0]} is not a valid private key version byte`);
        const actualChecksum = Utils.hashTwice256(data).slice(0, 4);
        assertThrow(_.isEqual(actualChecksum, checksum), () => "checksum not valid");
        // drop version byte
        data = data.slice(1, data.length);
        // check compressed byte and drop if true
        data = data.length === 33 && data[32] === 1 ? data.slice(0, data.length - 1) : data;
        return new ECKeyPair(data);
    }

    public static generate(): ECKeyPair {
        let random: Buffer;
        do {
            random = Crypto.randomBytes(32);
        } while (!privateKeyVerify(random));
        return new ECKeyPair(random);
    }

    public static generateFromPhrase(phrase: Passphrase | string, sequence: number = 0): ECKeyPair {
        let random: Buffer;
        do {
            random = Utils.hash256(Utils.hash512(Buffer.from(`${phrase.toString()} ${sequence}`)));
        } while (!privateKeyVerify(random));
        return new ECKeyPair(random);
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

    public get publicAddress(): Address {
        return new Address(this.publicKey);
    }

    public get privateWif(): Wif {
        return new Wif(this.privateKey, ECKeyPair.VERSION);
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
            return sigData.toString("hex");
        }
    }

    public secret(recipient: Address, nonce: Long): Buffer {
        const key = publicKeyTweakMul(recipient.publicKey, this.privateKey, true);
        return Utils.hash512(Buffer.from(nonce.toString() + Utils.hash512(key.slice(1)).toString("hex")));
    }
}
