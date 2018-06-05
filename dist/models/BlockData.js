"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class BlockData {
    constructor(headBlockNumber, headBlockId, expiration) {
        // tslint:disable-next-line:no-bitwise
        this.refBlockNum = (headBlockNumber & 0xFFFF);
        this.refBlockPrefix = _.parseInt(headBlockId.substring(8, 16).match(/.{1,2}/g).reverse().join(""), 16);
        this.expiration = expiration;
    }
}
exports.BlockData = BlockData;
//# sourceMappingURL=BlockData.js.map