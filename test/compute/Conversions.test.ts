import * as chai from "chai";
import { Decimal } from "decimal.js";
import * as Long from "long";
import "mocha";
import { suite, test } from "mocha-typescript";
import "reflect-metadata";
import { Asset, AssetAmount, AssetOptions, ChainObject, ExchangeRate } from "../../src/models";

chai.should();

const getTestAsset = (assetId: string, baseAmount: number, baseId: string, quoteAmount: number, quoteId: string): Asset => {
    const asset = new Asset();
    asset.id = ChainObject.parse(assetId);
    const base = new AssetAmount(Long.fromNumber(baseAmount), ChainObject.parse(baseId));
    const quote = new AssetAmount(Long.fromNumber(quoteAmount), ChainObject.parse(quoteId));
    const exchangeRate = new ExchangeRate();
    exchangeRate.base = base;
    exchangeRate.quote = quote;
    const assetOptions = new AssetOptions();
    assetOptions.exchangeable = true;
    assetOptions.exchangeRate = exchangeRate;
    asset.options = assetOptions;
    return asset;
};

const testAsset = getTestAsset("1.3.4", 1, "1.3.0", 10, "1.3.4");

@suite("conversions tests")
    // @ts-ignore
class ConversionsTest {
    @test
    public "should successfully convert from DCT to asset"() {
        testAsset.convertFromDCT(40).amount.toNumber().should.be.eq(4);
    }

    @test
    public "should successfully convert from asset to DCT"() {
        testAsset.convertToDCT(2).amount.toNumber().should.be.eq(20);
    }

    @test
    public "should successfully round ceil - default"() {
        testAsset.convertFromDCT(1).amount.toNumber().should.be.eq(1);
    }

    @test
    public "should successfully round floor"() {
        testAsset.convertFromDCT(1, Decimal.ROUND_FLOOR).amount.toNumber().should.be.eq(0);
    }
}
