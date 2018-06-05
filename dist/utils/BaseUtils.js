"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseBuffer_1 = require("./BaseBuffer");
class BaseUtils {
    static 2() {
        return new BaseBuffer_1.BaseBuffer("01");
    }
    static 8() {
        return new BaseBuffer_1.BaseBuffer("01234567");
    }
    static 11() {
        return new BaseBuffer_1.BaseBuffer("0123456789a");
    }
    static 16() {
        return new BaseBuffer_1.BaseBuffer("0123456789abcdef");
    }
    static 32() {
        return new BaseBuffer_1.BaseBuffer("0123456789ABCDEFGHJKMNPQRSTVWXYZ");
    }
    static 36() {
        return new BaseBuffer_1.BaseBuffer("0123456789abcdefghijklmnopqrstuvwxyz");
    }
    static 58() {
        return new BaseBuffer_1.BaseBuffer("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
    }
    static 62() {
        return new BaseBuffer_1.BaseBuffer("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }
    static 64() {
        return new BaseBuffer_1.BaseBuffer("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
    }
    static 66() {
        return new BaseBuffer_1.BaseBuffer("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~");
    }
}
exports.BaseUtils = BaseUtils;
//# sourceMappingURL=BaseUtils.js.map