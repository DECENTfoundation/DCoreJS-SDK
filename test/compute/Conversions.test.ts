import * as chai from "chai";
import { Decimal } from "decimal.js";
import "mocha";
import "reflect-metadata";
import { Asset, AssetAmount, AssetOptions, ChainObject, ExchangeRate } from "../../src/models";

chai.should();

const getTestAsset = (assetId: string, baseAmount: number, baseId: string, quoteAmount: number, quoteId: string): Asset => {
    const asset = new Asset();
    asset.id = ChainObject.parse(assetId);
    const base = new AssetAmount(baseAmount, ChainObject.parse(baseId));
    const quote = new AssetAmount(quoteAmount, ChainObject.parse(quoteId));
    asset.options = new AssetOptions(new ExchangeRate(base, quote));
    return asset;
};

const testAsset = getTestAsset("1.3.4", 1, "1.3.0", 10, "1.3.4");

describe("conversions tests", () => {
    it("should successfully convert from DCT to asset", () => {
        testAsset.convertFromDCT(40).amount.toNumber().should.be.eq(4);
    });

    it("should successfully convert from asset to DCT", () => {
        testAsset.convertToDCT(2).amount.toNumber().should.be.eq(20);
    });

    it("should successfully round ceil - default", () => {
        testAsset.convertFromDCT(1).amount.toNumber().should.be.eq(1);
    });

    it("should successfully round floor", () => {
        testAsset.convertFromDCT(1, Decimal.ROUND_FLOOR).amount.toNumber().should.be.eq(0);
    });
});
