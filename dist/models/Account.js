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
const Authority_1 = require("./Authority");
const ChainObject_1 = require("./ChainObject");
const Options_1 = require("./Options");
const Publishing_1 = require("./Publishing");
class Account {
}
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "id" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], Account.prototype, "id", void 0);
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "registrar" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], Account.prototype, "registrar", void 0);
__decorate([
    class_transformer_1.Expose({ name: "name" }),
    __metadata("design:type", String)
], Account.prototype, "name", void 0);
__decorate([
    class_transformer_1.Type(() => Authority_1.Authority),
    class_transformer_1.Expose({ name: "owner" }),
    __metadata("design:type", Authority_1.Authority)
], Account.prototype, "owner", void 0);
__decorate([
    class_transformer_1.Type(() => Authority_1.Authority),
    class_transformer_1.Expose({ name: "active" }),
    __metadata("design:type", Authority_1.Authority)
], Account.prototype, "active", void 0);
__decorate([
    class_transformer_1.Type(() => Options_1.Options),
    class_transformer_1.Expose({ name: "options" }),
    __metadata("design:type", Options_1.Options)
], Account.prototype, "options", void 0);
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "statistics" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], Account.prototype, "statistics", void 0);
__decorate([
    class_transformer_1.Type(() => Publishing_1.Publishing),
    class_transformer_1.Expose({ name: "rights_to_publish" }),
    __metadata("design:type", Publishing_1.Publishing)
], Account.prototype, "rightsToPublish", void 0);
__decorate([
    class_transformer_1.Expose({ name: "top_n_control_flags" }),
    __metadata("design:type", Number)
], Account.prototype, "topControlFlags", void 0);
exports.Account = Account;
//# sourceMappingURL=Account.js.map