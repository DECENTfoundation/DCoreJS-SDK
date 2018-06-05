"use strict";
// base-x encoding
// Forked from https://github.com/cryptocoinjs/bs58
// Originally written by Mike Hearn for BitcoinJ
// Copyright (c) 2011 Google Inc
// Ported to JavaScript by Stefan Thomas
// Merged Buffer refactorings from base58-native by Stephen Pair
// Ported to Typescript by Michal Grman
// Copyright (c) 2013 BitPay Inc
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
// tslint:disable-next-line:no-var-requires
const Buffer = require("safe-buffer").Buffer;
class BaseBuffer {
    constructor(alphabet) {
        this.indices = new Map();
        this.leader = alphabet.charAt(0);
        this.base = alphabet.length;
        this.alphabet = alphabet;
        // pre-compute lookup table
        for (let index = 0; index < this.base; index++) {
            const char = alphabet.charAt(index);
            if (this.indices.has(char)) {
                throw new TypeError(`Char ${char} at ${index} is ambiguous`);
            }
            this.indices.set(char, index);
        }
    }
    // tslint:disable:no-bitwise
    encode(source) {
        if (_.isEmpty(source)) {
            return "";
        }
        const digits = [0];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < source.length; ++i) {
            let carry = 0;
            for (let j = 0, c = source[i]; j < digits.length; ++j) {
                c += digits[j] << 8;
                digits[j] = c % this.base;
                carry = (c / this.base) | 0;
            }
            while (carry > 0) {
                digits.push(carry % this.base);
                carry = (carry / this.base) | 0;
            }
        }
        let result = "";
        // deal with leading zeros
        for (let k = 0; _.isNil(source[k]) && k < source.length - 1; ++k) {
            result += this.leader;
        }
        // convert digits to a string
        for (let q = digits.length - 1; q >= 0; --q) {
            result += this.alphabet[digits[q]];
        }
        return result;
    }
    decodeUnsafe(source) {
        if (typeof source !== "string") {
            throw new TypeError("Expected source must be string");
        }
        if (_.isEmpty(source)) {
            return Buffer.allocUnsafe(0);
        }
        const bytes = [0];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < source.length; i++) {
            const value = this.indices.get(source[i]);
            if (_.isNil(value)) {
                return;
            }
            let carry = 0;
            for (let j = 0, c = value; j < bytes.length; ++j) {
                c += bytes[j] * this.base;
                bytes[j] = c & 0xff;
                c >>= 8;
                carry = c;
            }
            while (carry > 0) {
                bytes.push(carry & 0xff);
                carry >>= 8;
            }
        }
        // deal with leading zeros
        for (let k = 0; source[k] === this.leader && k < source.length - 1; ++k) {
            bytes.push(0);
        }
        return Buffer.from(bytes.reverse());
    }
    // tslint:enable:no-bitwise
    decode(source) {
        const result = this.decodeUnsafe(source);
        if (!_.isNil(result)) {
            return result;
        }
        throw new Error("Non-base' + this.base + ' character");
    }
}
exports.BaseBuffer = BaseBuffer;
//# sourceMappingURL=BaseBuffer.js.map