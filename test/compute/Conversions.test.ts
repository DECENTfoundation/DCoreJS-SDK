import * as chai from "chai";
import { Decimal } from "decimal.js";
import * as Long from "long";
import "mocha";
import "reflect-metadata";
import { Asset, AssetAmount, AssetOptions, ChainObject, ExchangeRate } from "../../src/models";

chai.should();

const getTestAsset = (assetId: string, baseAmount: number, baseId: string, quoteAmount: number, quoteId: string): Asset => {
    const asset = new Asset();
    asset.id = ChainObject.parse(assetId);
    asset.precision = 4;
    asset.symbol = "TST";
    const base = new AssetAmount(baseAmount, ChainObject.parse(baseId));
    const quote = new AssetAmount(quoteAmount, ChainObject.parse(quoteId));
    asset.options = new AssetOptions(new ExchangeRate(base, quote));
    return asset;
};

const testAsset = getTestAsset("1.3.4", 1, "1.3.0", 10, "1.3.4");

describe("conversions tests", () => {
    it("should successfully convert from DCT to asset", () => {
        testAsset.convertFromDCT(4).amount.toNumber().should.be.eq(40);
    });

    it("should successfully convert from asset to DCT", () => {
        testAsset.convertToDCT(20).amount.toNumber().should.be.eq(2);
    });

    it("should successfully round ceil - default", () => {
        testAsset.convertToDCT(1).amount.toNumber().should.be.eq(1);
    });

    it("should successfully round floor", () => {
        testAsset.convertToDCT(1, Decimal.ROUND_FLOOR).amount.toNumber().should.be.eq(0);
    });

    it("should format raw value to string", () => {
        testAsset.formatter.format(Long.fromNumber(1234567890)).should.be.eq("123456.789 TST");
    });

    it("should format unit value from string", () => {
        testAsset.formatter.format(new Decimal(123456.7890)).should.be.eq("123456.789 TST");
    });

    it("should parse from string", () => {
        testAsset.formatter.amount("123456.789").amount.toNumber().should.be.eq(1234567890);
    });
});
