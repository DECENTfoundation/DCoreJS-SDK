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
class OperationHistory {
}
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "id" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], OperationHistory.prototype, "id", void 0);
__decorate([
    class_transformer_1.Expose({ name: "op" }),
    __metadata("design:type", Object)
], OperationHistory.prototype, "op", void 0);
__decorate([
    class_transformer_1.Expose({ name: "result" }),
    __metadata("design:type", Object)
], OperationHistory.prototype, "result", void 0);
__decorate([
    class_transformer_1.Expose({ name: "block_num" }),
    __metadata("design:type", Number)
], OperationHistory.prototype, "blockNum", void 0);
__decorate([
    class_transformer_1.Expose({ name: "trx_num" }),
    __metadata("design:type", Number)
], OperationHistory.prototype, "trxNum", void 0);
__decorate([
    class_transformer_1.Expose({ name: "op_in_trx" }),
    __metadata("design:type", Number)
], OperationHistory.prototype, "opNum", void 0);
__decorate([
    class_transformer_1.Expose({ name: "virtual_op" }),
    __metadata("design:type", Number)
], OperationHistory.prototype, "virtualOp", void 0);
exports.OperationHistory = OperationHistory;
//# sourceMappingURL=OperationHistory.js.map