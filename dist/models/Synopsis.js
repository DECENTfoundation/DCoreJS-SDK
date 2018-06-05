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
class Synopsis {
}
__decorate([
    class_transformer_1.Expose({ name: "title" }),
    __metadata("design:type", String)
], Synopsis.prototype, "title", void 0);
__decorate([
    class_transformer_1.Expose({ name: "description" }),
    __metadata("design:type", String)
], Synopsis.prototype, "description", void 0);
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "content_type_id" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], Synopsis.prototype, "type", void 0);
__decorate([
    class_transformer_1.Expose({ name: "file_name" }),
    __metadata("design:type", String)
], Synopsis.prototype, "fileName", void 0);
__decorate([
    class_transformer_1.Expose({ name: "sampleURL" }),
    __metadata("design:type", String)
], Synopsis.prototype, "sampleUrl", void 0);
__decorate([
    class_transformer_1.Expose({ name: "fileFormat" }),
    __metadata("design:type", String)
], Synopsis.prototype, "fileFormat", void 0);
exports.Synopsis = Synopsis;
//# sourceMappingURL=Synopsis.js.map