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
const ChainObject_1 = require("./ChainObject");
const PricePerRegion_1 = require("./PricePerRegion");
class Content {
}
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "id" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], Content.prototype, "id", void 0);
__decorate([
    class_transformer_1.Expose({ name: "author" }),
    __metadata("design:type", String)
], Content.prototype, "author", void 0);
__decorate([
    class_transformer_1.Type(() => PricePerRegion_1.PricePerRegion),
    class_transformer_1.Expose({ name: "price" }),
    __metadata("design:type", PricePerRegion_1.PricePerRegion)
], Content.prototype, "price", void 0);
__decorate([
    class_transformer_1.Expose({ name: "synopsis" }),
    __metadata("design:type", Object)
], Content.prototype, "synopsis", void 0);
__decorate([
    class_transformer_1.Expose({ name: "URI" }),
    __metadata("design:type", String)
], Content.prototype, "uri", void 0);
__decorate([
    class_transformer_1.Expose({ name: "_hash" }),
    __metadata("design:type", String)
], Content.prototype, "hash", void 0);
__decorate([
    class_transformer_1.Expose({ name: "AVG_rating" }),
    __metadata("design:type", String)
], Content.prototype, "rating", void 0);
__decorate([
    class_transformer_1.Expose({ name: "size" }),
    __metadata("design:type", Number)
], Content.prototype, "size", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    class_transformer_1.Expose({ name: "expiration" }),
    __metadata("design:type", Date)
], Content.prototype, "expiration", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    class_transformer_1.Expose({ name: "created" }),
    __metadata("design:type", Date)
], Content.prototype, "created", void 0);
__decorate([
    class_transformer_1.Expose({ name: "times_bought" }),
    __metadata("design:type", Number)
], Content.prototype, "timesBought", void 0);
exports.Content = Content;
//# sourceMappingURL=Content.js.map