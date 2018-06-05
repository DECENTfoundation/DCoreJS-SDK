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
class DynamicGlobalProperties {
}
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "id" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], DynamicGlobalProperties.prototype, "id", void 0);
__decorate([
    class_transformer_1.Expose({ name: "head_block_number" }),
    __metadata("design:type", Number)
], DynamicGlobalProperties.prototype, "headBlockNumber", void 0);
__decorate([
    class_transformer_1.Expose({ name: "head_block_id" }),
    __metadata("design:type", String)
], DynamicGlobalProperties.prototype, "headBlockId", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    class_transformer_1.Expose({ name: "time" }),
    __metadata("design:type", Date)
], DynamicGlobalProperties.prototype, "time", void 0);
__decorate([
    class_transformer_1.Type(() => ChainObject_1.ChainObject),
    class_transformer_1.Expose({ name: "current_miner" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], DynamicGlobalProperties.prototype, "currentMiner", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    class_transformer_1.Expose({ name: "next_maintenance_time" }),
    __metadata("design:type", Date)
], DynamicGlobalProperties.prototype, "nextMaintenanceTime", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    class_transformer_1.Expose({ name: "last_budget_time" }),
    __metadata("design:type", Date)
], DynamicGlobalProperties.prototype, "lastBudgetTime", void 0);
__decorate([
    class_transformer_1.Expose({ name: "unspent_fee_budget" }),
    __metadata("design:type", Number)
], DynamicGlobalProperties.prototype, "unspentFeeBudget", void 0);
__decorate([
    class_transformer_1.Expose({ name: "mined_rewards" }),
    __metadata("design:type", Number)
], DynamicGlobalProperties.prototype, "minedRewards", void 0);
__decorate([
    class_transformer_1.Expose({ name: "miner_budget_from_fees" }),
    __metadata("design:type", Number)
], DynamicGlobalProperties.prototype, "minerBudgetFromFees", void 0);
__decorate([
    class_transformer_1.Expose({ name: "miner_budget_from_rewards" }),
    __metadata("design:type", Number)
], DynamicGlobalProperties.prototype, "minerBudgetFromRewards", void 0);
__decorate([
    class_transformer_1.Expose({ name: "accounts_registered_this_interval" }),
    __metadata("design:type", Number)
], DynamicGlobalProperties.prototype, "accountsRegisteredThisInterval", void 0);
__decorate([
    class_transformer_1.Expose({ name: "recently_missed_count" }),
    __metadata("design:type", Number)
], DynamicGlobalProperties.prototype, "recentlyMissedCount", void 0);
__decorate([
    class_transformer_1.Expose({ name: "current_aslot" }),
    __metadata("design:type", Number)
], DynamicGlobalProperties.prototype, "currentAslot", void 0);
__decorate([
    class_transformer_1.Expose({ name: "recent_slots_filled" }),
    __metadata("design:type", String)
], DynamicGlobalProperties.prototype, "recentSlotsFilled", void 0);
__decorate([
    class_transformer_1.Expose({ name: "dynamic_flags" }),
    __metadata("design:type", Number)
], DynamicGlobalProperties.prototype, "dynamicFlags", void 0);
__decorate([
    class_transformer_1.Expose({ name: "last_irreversible_block_num" }),
    __metadata("design:type", Number)
], DynamicGlobalProperties.prototype, "lastIrreversibleBlockNum", void 0);
exports.DynamicGlobalProperties = DynamicGlobalProperties;
//# sourceMappingURL=DynamicGlobalProperties.js.map