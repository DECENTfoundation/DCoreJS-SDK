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
class ProcessedTransaction {
}
__decorate([
    class_transformer_1.Expose({ name: "signatures" }),
    __metadata("design:type", Array)
], ProcessedTransaction.prototype, "signatures", void 0);
__decorate([
    class_transformer_1.Expose({ name: "extensions" }),
    __metadata("design:type", Array)
], ProcessedTransaction.prototype, "extensions", void 0);
__decorate([
    class_transformer_1.Expose({ name: "operations" }),
    __metadata("design:type", Array)
], ProcessedTransaction.prototype, "operations", void 0);
__decorate([
    class_transformer_1.Expose({ name: "expiration" }),
    __metadata("design:type", Date)
], ProcessedTransaction.prototype, "expiration", void 0);
__decorate([
    class_transformer_1.Expose({ name: "ref_block_num" }),
    __metadata("design:type", Number)
], ProcessedTransaction.prototype, "refBlockNum", void 0);
__decorate([
    class_transformer_1.Expose({ name: "ref_block_prefix" }),
    __metadata("design:type", Number)
], ProcessedTransaction.prototype, "refBlockPrefix", void 0);
__decorate([
    class_transformer_1.Expose({ name: "operation_results" }),
    __metadata("design:type", Array)
], ProcessedTransaction.prototype, "opResults", void 0);
exports.ProcessedTransaction = ProcessedTransaction;
//# sourceMappingURL=ProcessedTransaction.js.map