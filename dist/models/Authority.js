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
const AuthorityMap_1 = require("./AuthorityMap");
class Authority {
}
__decorate([
    class_transformer_1.Expose({ name: "weight_threshold" }),
    __metadata("design:type", Number)
], Authority.prototype, "weightThreshold", void 0);
__decorate([
    class_transformer_1.Expose({ name: "account_auths" }),
    __metadata("design:type", Array)
], Authority.prototype, "accountAuths", void 0);
__decorate([
    class_transformer_1.Type(() => AuthorityMap_1.AuthorityMap),
    class_transformer_1.Transform((values) => values.map((value) => new AuthorityMap_1.AuthorityMap(value[0], value[1])), { toClassOnly: true }),
    class_transformer_1.Transform((values) => values.map((value) => [value.value, value.weight]), { toPlainOnly: true }),
    class_transformer_1.Expose({ name: "key_auths" }),
    __metadata("design:type", Array)
], Authority.prototype, "keyAuths", void 0);
exports.Authority = Authority;
//# sourceMappingURL=Authority.js.map