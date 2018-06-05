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
const ChainObject_1 = require("./ChainObject");
class Miner {
}
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "id" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], Miner.prototype, "id", void 0);
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "miner_account" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], Miner.prototype, "minerAccount", void 0);
__decorate([
    class_transformer_1.Expose({ name: "last_aslot" }),
    __metadata("design:type", Number)
], Miner.prototype, "lastAslot", void 0);
__decorate([
    class_transformer_1.Type(() => Address_1.Address),
    class_transformer_1.Expose({ name: "signing_key" }),
    __metadata("design:type", Address_1.Address)
], Miner.prototype, "signingKey", void 0);
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "pay_vb" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], Miner.prototype, "payVb", void 0);
__decorate([
    class_transformer_1.Expose({ name: "vote_id" }),
    __metadata("design:type", String)
], Miner.prototype, "voteId", void 0);
__decorate([
    class_transformer_1.Expose({ name: "total_votes" }),
    __metadata("design:type", Number)
], Miner.prototype, "totalVotes", void 0);
__decorate([
    class_transformer_1.Expose({ name: "url" }),
    __metadata("design:type", String)
], Miner.prototype, "url", void 0);
__decorate([
    class_transformer_1.Expose({ name: "total_missed" }),
    __metadata("design:type", Number)
], Miner.prototype, "totalMissed", void 0);
__decorate([
    class_transformer_1.Expose({ name: "last_confirmed_block_num" }),
    __metadata("design:type", Number)
], Miner.prototype, "lastConfirmedBlockNum", void 0);
exports.Miner = Miner;
//# sourceMappingURL=Miner.js.map