"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const Address_1 = require("../crypto/Address");
const AssetAmount_1 = require("./AssetAmount");
const ChainObject_1 = require("./ChainObject");
class Options {
}
__decorate([
    class_transformer_1.Type(() => Address_1.Address),
    class_transformer_1.Expose({ name: "memo_key" }),
    __metadata("design:type", Address_1.Address)
], Options.prototype, "memoKey", void 0);
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "voting_account" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], Options.prototype, "votingAccount", void 0);
__decorate([
    class_transformer_1.Expose({ name: "num_miner" }),
    __metadata("design:type", Number)
], Options.prototype, "numMiner", void 0);
__decorate([
    class_transformer_1.Expose({ name: "votes" }),
    __metadata("design:type", Array)
], Options.prototype, "votes", void 0);
__decorate([
    class_transformer_1.Expose({ name: "extensions" }),
    __metadata("design:type", Array)
], Options.prototype, "extensions", void 0);
__decorate([
    class_transformer_1.Expose({ name: "allow_subscription" }),
    __metadata("design:type", Boolean)
], Options.prototype, "allowSubscription", void 0);
__decorate([
    class_transformer_1.Type(() => AssetAmount_1.AssetAmount),
    class_transformer_1.Expose({ name: "price_per_subscribe" }),
    __metadata("design:type", AssetAmount_1.AssetAmount)
], Options.prototype, "pricePerSubscribe", void 0);
__decorate([
    class_transformer_1.Expose({ name: "subscription_period" }),
    __metadata("design:type", Number)
], Options.prototype, "subscriptionPeriod", void 0);
exports.Options = Options;
//# sourceMappingURL=Options.js.map