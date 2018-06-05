"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isNil = require("lodash/fp/isNil");
const operators_1 = require("rxjs/operators");
class DCoreApiRx {
    getBalance(account, symbol) {
        const balance = typeof account === "string"
            ? this.getAccountByName(account).pipe(operators_1.concatMap((acc) => this.getBalanceInternal(acc.id)))
            : this.getBalanceInternal(account);
        if (!isNil(symbol)) {
            this.lookupAssets([symbol]).pipe(operators_1.map((list) => list[0]), operators_1.concatMap((asset) => balance.pipe(operators_1.map((balances) => {
                const found = balances.find((amount) => amount.assetId === asset.id);
                return isNil(balance) ? 0 : found.amount;
            }))));
        }
        else {
            return balance;
        }
    }
}
exports.DCoreApiRx = DCoreApiRx;
//# sourceMappingURL=DCoreApiRx.js.map