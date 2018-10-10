import * as BaseX from "base-x";
import * as Crypto from "crypto";
import { createHash } from "crypto";
import * as Long from "long";
import * as moment from "moment";
import { ECKeyPair } from "../crypto/ECKeyPair";

export function assertThrow(value: boolean, lazyMessage: () => string) {
    if (!value) {
        throw TypeError(lazyMessage());
    }
}

export class Utils {

    public static Base58 = BaseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");

    public static generateNonce(): Long {
        const entropy = createHash("sha224").update(ECKeyPair.generate().privateKey).digest();
        const time = Buffer.of(...Long.fromValue(moment().valueOf()).toBytesLE());
        const bytes = Buffer.concat([time.slice(0, 7), entropy.slice(0, 1)]);
        return Long.fromBytesLE([...bytes], true);
    }

    public static hash256(data: Buffer): Buffer {
        return createHash("sha256").update(data).digest();
    }

    public static hash512(data: Buffer): Buffer {
        return createHash("sha512").update(data).digest();
    }

    public static hashTwice256(data: Buffer): Buffer {
        return this.hash256(this.hash256(data));
    }

    public static ripemd160(data: Buffer): Buffer {
        return createHash("ripemd160").update(data).digest();
    }

    public static encrypt(secret: Buffer, data: Buffer): Buffer {
        const cipher = Crypto.createCipheriv("aes-256-cbc", secret.slice(0, 32), secret.slice(32, 32 + 16));
        cipher.setAutoPadding(true);
        return Buffer.concat([cipher.update(data), cipher.final()]);
    }

    public static decrypt(secret: Buffer, data: Buffer): Buffer {
        const cipher = Crypto.createDecipheriv("aes-256-cbc", secret.slice(0, 32), secret.slice(32, 32 + 16));
        cipher.setAutoPadding(true);
        return Buffer.concat([cipher.update(data), cipher.final()]);
    }
}
