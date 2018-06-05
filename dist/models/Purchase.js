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
const AssetAmount_1 = require("./AssetAmount");
const ChainObject_1 = require("./ChainObject");
const KeyParts_1 = require("./KeyParts");
const PubKey_1 = require("./PubKey");
class Purchase {
}
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "id" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], Purchase.prototype, "id", void 0);
__decorate([
    class_transformer_1.Expose({ name: "consumer" }),
    __metadata("design:type", String)
], Purchase.prototype, "author", void 0);
__decorate([
    class_transformer_1.Expose({ name: "URI" }),
    __metadata("design:type", String)
], Purchase.prototype, "uri", void 0);
__decorate([
    class_transformer_1.Expose({ name: "synopsis" }),
    __metadata("design:type", String)
], Purchase.prototype, "synopsisJson", void 0);
__decorate([
    class_transformer_1.Type(() => AssetAmount_1.AssetAmount),
    class_transformer_1.Expose({ name: "price" }),
    __metadata("design:type", AssetAmount_1.AssetAmount)
], Purchase.prototype, "price", void 0);
__decorate([
    class_transformer_1.Type(() => AssetAmount_1.AssetAmount),
    class_transformer_1.Expose({ name: "paid_price_before_exchange" }),
    __metadata("design:type", AssetAmount_1.AssetAmount)
], Purchase.prototype, "priceBefore", void 0);
__decorate([
    class_transformer_1.Type(() => AssetAmount_1.AssetAmount),
    class_transformer_1.Expose({ name: "paid_price_after_exchange" }),
    __metadata("design:type", AssetAmount_1.AssetAmount)
], Purchase.prototype, "priceAfter", void 0);
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "seeders_answered" }),
    __metadata("design:type", Array)
], Purchase.prototype, "seedersAnswered", void 0);
__decorate([
    class_transformer_1.Expose({ name: "size" }),
    __metadata("design:type", Number)
], Purchase.prototype, "size", void 0);
__decorate([
    class_transformer_1.Expose({ name: "rating" }),
    __metadata("design:type", Number)
], Purchase.prototype, "rating", void 0);
__decorate([
    class_transformer_1.Expose({ name: "comment" }),
    __metadata("design:type", String)
], Purchase.prototype, "comment", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    class_transformer_1.Expose({ name: "expiration_time" }),
    __metadata("design:type", Date)
], Purchase.prototype, "expiration", void 0);
__decorate([
    class_transformer_1.Type(() => PubKey_1.PubKey),
    class_transformer_1.Expose({ name: "pubKey" }),
    __metadata("design:type", PubKey_1.PubKey)
], Purchase.prototype, "pubElGamalKey", void 0);
__decorate([
    class_transformer_1.Type(() => KeyParts_1.KeyParts),
    class_transformer_1.Expose({ name: "key_particles" }),
    __metadata("design:type", Array)
], Purchase.prototype, "keyParticles", void 0);
__decorate([
    class_transformer_1.Expose({ name: "expired" }),
    __metadata("design:type", Boolean)
], Purchase.prototype, "expired", void 0);
__decorate([
    class_transformer_1.Expose({ name: "delivered" }),
    __metadata("design:type", Boolean)
], Purchase.prototype, "delivered", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    class_transformer_1.Expose({ name: "expiration_or_delivery_time" }),
    __metadata("design:type", Date)
], Purchase.prototype, "deliveryExpiration", void 0);
__decorate([
    class_transformer_1.Expose({ name: "rated_or_commented" }),
    __metadata("design:type", Boolean)
], Purchase.prototype, "ratedOrCommented", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    class_transformer_1.Expose({ name: "created" }),
    __metadata("design:type", Date)
], Purchase.prototype, "created", void 0);
__decorate([
    class_transformer_1.Expose({ name: "region_code_from" }),
    __metadata("design:type", Number)
], Purchase.prototype, "regionFrom", void 0);
exports.Purchase = Purchase;
//# sourceMappingURL=Purchase.js.map