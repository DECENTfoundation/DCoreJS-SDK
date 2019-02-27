import * as chai from "chai";
import { Decimal } from "decimal.js";
import * as Long from "long";
import "mocha";
import { suite, test } from "mocha-typescript";
import "reflect-metadata";
import { Asset, AssetAmount, AssetOptions, ChainObject, ExchangeRate } from "../../src/models";
import { UnsupportedAssetError } from "../../src/models/error/UnsupportedAssetError";

chai.should();

const getTestAsset = (assetId: string, baseAmount: Long, baseId: string, quoteAmount: Long, quoteId: string ): Asset => {
    const asset = new Asset();
    asset.id = ChainObject.parse(assetId);
    const base = new AssetAmount(baseAmount, ChainObject.parse(baseId));
    const quote = new AssetAmount(quoteAmount, ChainObject.parse(quoteId));
    const exchangeRate = new ExchangeRate();
    exchangeRate.base = base;
    exchangeRate.quote = quote;
    const assetOptions = new AssetOptions();
    assetOptions.exchangeable = true;
    assetOptions.exchangeRate = exchangeRate;
    asset.options = assetOptions;
    return asset;
};

@suite("conversions tests")
    // @ts-ignore
class ConversionsTest {
    @test
    public "should successfully convert from DCT to asset"() {
        const asset = getTestAsset("1.3.4", Long.fromString("2"), "1.3.0", Long.fromString("1"), "1.3.4");
        const result = asset.convert(new AssetAmount(Long.fromString("4"), ChainObject.parse("1.3.0")));
        chai.expect(result.amount.toString()).eq("2");
    }

    @test
    public "should successfully convert from asset to DCT"() {
        const asset = getTestAsset("1.3.0", Long.fromString("2"), "1.3.0", Long.fromString("1"), "1.3.4");
        const result = asset.convert(new AssetAmount(Long.fromString("4"), ChainObject.parse("1.3.4")));
        chai.expect(result.amount.toString()).eq("8");
    }

    @test
    public "should successfully round floor - default"() {
        const asset = getTestAsset("1.3.0", Long.fromString("1"), "1.3.0", Long.fromString("10"), "1.3.4");
        const result = asset.convert(new AssetAmount(Long.fromString("1"), ChainObject.parse("1.3.4")));
        chai.expect(result.amount.toString()).eq("1");
    }

    @test
    public "should successfully round floor"() {
        const asset = getTestAsset("1.3.0", Long.fromString("1"), "1.3.0", Long.fromString("10"), "1.3.4");
        const result = asset.convert(new AssetAmount(Long.fromString("1"), ChainObject.parse("1.3.4")), Decimal.ROUND_FLOOR);
        chai.expect(result.amount.toString()).eq("0");
    }

    @test
    public "throw error for non-exchangeable asset"() {
        const asset = getTestAsset("1.3.0", Long.fromString("1"), "1.3.0", Long.fromString("10"), "1.3.4");
        asset.options.exchangeable = false;
        try {
            asset.convert(new AssetAmount(Long.fromString("1"), ChainObject.parse("1.3.4")));
        } catch (e) {
            e.should.be.instanceOf(UnsupportedAssetError);
        }
    }

    @test
    public "throw error for conversion without DCT"() {
        const asset = getTestAsset("1.3.2", Long.fromString("1"), "1.3.0", Long.fromString("10"), "1.3.4");
        try {
            asset.convert(new AssetAmount(Long.fromString("1"), ChainObject.parse("1.3.4")));
        } catch (e) {
            e.should.be.instanceOf(UnsupportedAssetError);
        }
    }

    @test
    public "throw error for unmatched assets"() {
        const asset = getTestAsset("1.3.2", Long.fromString("1"), "1.3.0", Long.fromString("10"), "1.3.4");
        try {
            asset.convert(new AssetAmount(Long.fromString("1"), ChainObject.parse("1.3.3")));
        } catch (e) {
            e.should.be.instanceOf(Error);
        }
    }
}
