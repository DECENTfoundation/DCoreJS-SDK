/// <reference types="node" />
import * as BaseX from "base-x";
export declare function assertThrow(value: boolean, lazyMessage: () => string): void;
export declare class Utils {
    static Base2: BaseX.BaseConverter;
    static Base8: BaseX.BaseConverter;
    static Base11: BaseX.BaseConverter;
    static Base16: BaseX.BaseConverter;
    static Base32: BaseX.BaseConverter;
    static Base36: BaseX.BaseConverter;
    static Base58: BaseX.BaseConverter;
    static Base62: BaseX.BaseConverter;
    static Base64: BaseX.BaseConverter;
    static Base66: BaseX.BaseConverter;
    static hash256(data: Buffer): Buffer;
    static hashTwice256(data: Buffer): Buffer;
    static ripemd160(data: Buffer): Buffer;
}
