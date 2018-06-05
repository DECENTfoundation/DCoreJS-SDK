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
const OperationType_1 = require("../../net/models/OperationType");
const Authority_1 = require("../Authority");
const ChainObject_1 = require("../ChainObject");
const Options_1 = require("../Options");
const BaseOperation_1 = require("./BaseOperation");
/**
 * Request to account update operation constructor
 *
 * @param accountId account
 * @param owner owner authority
 * @param active active authority
 * @param options account options
 *
 */
class AccountUpdateOperation extends BaseOperation_1.BaseOperation {
    constructor(accountId, owner, active, options) {
        super(OperationType_1.OperationType.AccountUpdate);
        this.accountId = accountId;
        this.owner = owner;
        this.active = active;
        this.options = options;
    }
}
__decorate([
    class_transformer_1.Expose({ name: "account" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], AccountUpdateOperation.prototype, "accountId", void 0);
__decorate([
    class_transformer_1.Expose({ name: "owner" }),
    __metadata("design:type", Authority_1.Authority)
], AccountUpdateOperation.prototype, "owner", void 0);
__decorate([
    class_transformer_1.Expose({ name: "active" }),
    __metadata("design:type", Authority_1.Authority)
], AccountUpdateOperation.prototype, "active", void 0);
__decorate([
    class_transformer_1.Expose({ name: "options" }),
    __metadata("design:type", Options_1.Options)
], AccountUpdateOperation.prototype, "options", void 0);
exports.AccountUpdateOperation = AccountUpdateOperation;
//# sourceMappingURL=AccountUpdateOperation.js.map