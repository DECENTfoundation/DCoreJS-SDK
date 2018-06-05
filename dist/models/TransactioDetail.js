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
const Memo_1 = require("./Memo");
class TransactionDetail {
}
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "id" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], TransactionDetail.prototype, "id", void 0);
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "m_from_account" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], TransactionDetail.prototype, "from", void 0);
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "m_to_account" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], TransactionDetail.prototype, "to", void 0);
__decorate([
    class_transformer_1.Expose({ name: "m_operation_type" }),
    __metadata("design:type", Number)
], TransactionDetail.prototype, "type", void 0);
__decorate([
    class_transformer_1.Type(() => AssetAmount_1.AssetAmount),
    class_transformer_1.Expose({ name: "m_transaction_amount" }),
    __metadata("design:type", AssetAmount_1.AssetAmount)
], TransactionDetail.prototype, "amount", void 0);
__decorate([
    class_transformer_1.Type(() => Memo_1.Memo),
    class_transformer_1.Expose({ name: "m_transaction_encrypted_memo" }),
    __metadata("design:type", Memo_1.Memo)
], TransactionDetail.prototype, "memo", void 0);
__decorate([
    class_transformer_1.Type(() => AssetAmount_1.AssetAmount),
    class_transformer_1.Expose({ name: "m_transaction_fee" }),
    __metadata("design:type", AssetAmount_1.AssetAmount)
], TransactionDetail.prototype, "fee", void 0);
__decorate([
    class_transformer_1.Expose({ name: "m_str_description" }),
    __metadata("design:type", String)
], TransactionDetail.prototype, "description", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    class_transformer_1.Expose({ name: "m_timestamp" }),
    __metadata("design:type", Date)
], TransactionDetail.prototype, "timestamp", void 0);
exports.TransactionDetail = TransactionDetail;
//# sourceMappingURL=TransactioDetail.js.map