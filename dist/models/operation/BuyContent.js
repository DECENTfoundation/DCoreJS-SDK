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
const AssetAmount_1 = require("../AssetAmount");
const ChainObject_1 = require("../ChainObject");
const PubKey_1 = require("../PubKey");
const BaseOperation_1 = require("./BaseOperation");
/**
 * Request to buy content operation constructor
 *
 * @param uri uri of the content
 * @param consumer chain object id of the buyer's account
 * @param price price of content, can be equal to or higher then specified in content
 * @param publicElGamal public el gamal key
 * @param regionCode region code of the consumer
 */
class BuyContent extends BaseOperation_1.BaseOperation {
    constructor(uri, consumer, price, pubKey) {
        super(OperationType_1.OperationType.RequestToBuy);
        this.regionCode = 1;
        this.uri = uri;
        this.consumer = consumer;
        this.price = price;
        this.pubKey = pubKey;
    }
}
__decorate([
    class_transformer_1.Expose({ name: "URI" }),
    __metadata("design:type", String)
], BuyContent.prototype, "uri", void 0);
__decorate([
    class_transformer_1.Expose({ name: "consumer" }),
    __metadata("design:type", ChainObject_1.ChainObject)
], BuyContent.prototype, "consumer", void 0);
__decorate([
    class_transformer_1.Expose({ name: "price" }),
    __metadata("design:type", AssetAmount_1.AssetAmount)
], BuyContent.prototype, "price", void 0);
__decorate([
    class_transformer_1.Expose({ name: "pubKey" }),
    __metadata("design:type", PubKey_1.PubKey)
], BuyContent.prototype, "pubKey", void 0);
__decorate([
    class_transformer_1.Expose({ name: "region_code_from" }),
    __metadata("design:type", Number)
], BuyContent.prototype, "regionCode", void 0);
exports.BuyContent = BuyContent;
//# sourceMappingURL=BuyContent.js.map