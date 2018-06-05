"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Address {
    constructor(publicKey, prefix = Address.PREFIX) {
        this.publicKey = publicKey;
        this.prefix = prefix;
    }
    toString() { return this.encode(); }
    encode() {
        return "";
    }
}
Address.PREFIX = "DCT";
exports.Address = Address;
//# sourceMappingURL=Address.js.map