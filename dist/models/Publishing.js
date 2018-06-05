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
class Publishing {
}
__decorate([
    class_transformer_1.Expose({ name: "is_publishing_manager" }),
    __metadata("design:type", Boolean)
], Publishing.prototype, "isPublishingManager", void 0);
__decorate([
    class_transformer_1.Expose({ name: "publishing_rights_received" }),
    __metadata("design:type", Array)
], Publishing.prototype, "publishRightsReceived", void 0);
__decorate([
    class_transformer_1.Expose({ name: "publishing_rights_forwarded" }),
    __metadata("design:type", Array)
], Publishing.prototype, "publishRightsForwarded", void 0);
exports.Publishing = Publishing;
//# sourceMappingURL=Publishing.js.map