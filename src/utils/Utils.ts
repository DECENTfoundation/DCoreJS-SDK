import { Logger } from "@log4js-node/log4js-api";
import * as BaseX from "base-x";
import { serialize } from "class-transformer";
import * as Crypto from "crypto";
import { createHash } from "crypto";
import * as Long from "long";
import * as moment from "moment";
import { MonoTypeOperatorFunction } from "rxjs";
import { tap } from "rxjs/operators";

export function assertThrow(value: boolean, lazyMessage: () => string = () => "assert error") {
    if (!value) {
        throw TypeError(lazyMessage());
    }
}

export function toMap<K, V>(values: V[], selector: (value: V) => K): Map<K, V> {
    return new Map<K, V>(values.map((val) => [selector(val), val]));
}

export function info<T>(tag: string, logger: Logger): MonoTypeOperatorFunction<T> {
    return tap({
        complete: () => logger.info(`${tag}: #complete`),
        error: (err) => logger.error(`${tag}: #error ${err}`),
        next: (value) => logger.info(`${tag}: #next ${typeof value === "string" ? value : serialize(value)}`),
    });
}

export function debug<T>(tag: string, logger: Logger): MonoTypeOperatorFunction<T> {
    return tap({
        complete: () => logger.debug(`${tag}: #complete`),
        error: (err) => logger.error(`${tag}: #error ${err}`),
        next: (value) => logger.debug(`${tag}: #next ${typeof value === "string" ? value : serialize(value)}`),
    });
}

export class Utils {

    public static Base58 = BaseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");

    public static generateNonce(power: number = 250): Long {
        return Long.fromString(Utils.generateEntropy(power).toString("hex"), true, 16);
    }

    public static generateEntropy(power: number = 250): Buffer {
        const input = Buffer.from(moment().toString());
        let entropy = Buffer.concat([
            Utils.hash256(input),
            Buffer.from(input.toString("binary")),
            Buffer.from(moment().toString()),
        ]);

        const start = moment().valueOf();
        while ((moment().valueOf() - start) < power) {
            entropy = Utils.hash256(entropy);
        }

        return Utils.hash256(Buffer.concat([entropy, Crypto.randomBytes(32)]));
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
