import * as BaseX from "base-x";
import { createHash } from "crypto";

export function assertThrow(value: boolean, lazyMessage: () => string) {
    if (!value) {
        throw TypeError(lazyMessage());
    }
}

export class Utils {

    public static Base2 = BaseX("01");

    public static Base8 = BaseX("01234567");

    public static Base11 = BaseX("0123456789a");

    public static Base16 = BaseX("0123456789abcdef");

    public static Base32 = BaseX("0123456789ABCDEFGHJKMNPQRSTVWXYZ");

    public static Base36 = BaseX("0123456789abcdefghijklmnopqrstuvwxyz");

    public static Base58 = BaseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");

    public static Base62 = BaseX("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

    public static Base64 = BaseX("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");

    public static Base66 = BaseX("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~");

    public static hash256(data: Buffer): Buffer {
        return createHash("sha256").update(data).digest();
    }

    public static hashTwice256(data: Buffer): Buffer {
        return this.hash256(this.hash256(data));
    }

    public static ripemd160(data: Buffer): Buffer {
        return createHash("ripemd160").update(data).digest();
    }
}
