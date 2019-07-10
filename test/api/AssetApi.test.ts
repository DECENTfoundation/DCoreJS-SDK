import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import * as _ from "lodash";
import * as Long from "long";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { ECKeyPair } from "../../src/crypto/ECKeyPair";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { Asset, AssetAmount, AssetClaimFeesOperation, AssetFundPoolsOperation, ChainObject, DCoreError, RealSupply } from "../../src/models";
import { AssetData } from "../../src/models/AssetData";
import { Helpers, testCheck, testCheckWith } from "../Helpers";

chai.should();
chai.use(chaiThings);

describe("asset API test suite for ops", () => {

    let api: DCoreApi;
    let spy: Spy;

    before(() => {
        spy = create();
        // spy.log(/^API\w+/);
        api = DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS));
    });

    after(() => {
        api.disconnect();
        spy.teardown();
    });

    it("should create main SDK asset", (done: (arg?: any) => void) => {
        testCheck(done,
            api.assetApi.create(
                Helpers.CREDENTIALS,
                Helpers.createAsset,
                12,
                "test asset",
            ));
    });

    // account_id_type fee_payer()const { return monitored_asset_opts.valid() ? account_id_type() : issuer; }
    // therefore Missing Active Authority 1.2.0
    it.skip("should create a monitored asset", (done: (arg?: any) => void) => {
        testCheck(done, api.assetApi.createMonitoredAsset(
            Helpers.CREDENTIALS,
            "MSDK",
            4,
            "hello api monitored",
        ));
    });

    it("should update an asset", (done: (arg?: any) => void) => {
        testCheck(done, api.assetApi.update(
            Helpers.CREDENTIALS,
            Helpers.createAsset,
            [1, 50],
            "some nested asset",
            true,
            Long.fromValue(Date.now() / 1000),
        ));
    });

    it("should update advanced asset", (done: (arg?: any) => void) => {
        testCheck(done, api.assetApi.updateAdvanced(
            Helpers.CREDENTIALS,
            Helpers.createAsset,
            6,
            true,
        ));
    });

    it("should issue an asset", (done: (arg?: any) => void) => {
        testCheck(done, api.assetApi.issue(
            Helpers.CREDENTIALS,
            Helpers.createAsset,
            6000000,
        ));
    });

    it("should fund an asset pool", (done: (arg?: any) => void) => {
        testCheck(done, api.assetApi.fund(
            Helpers.CREDENTIALS,
            Helpers.createAsset,
            0,
            100000, // 0.01 dct fee
        ));
    });

    it("should fund an asset pool from non-issuer account", (done: (arg?: any) => void) => {
        const op = new AssetFundPoolsOperation(Helpers.ACCOUNT2, new AssetAmount(0, Helpers.createAssetId), new AssetAmount(1));
        testCheck(done, api.broadcastApi.broadcastWithCallback(ECKeyPair.parseWif(Helpers.PRIVATE2), [op]));
    });

    it("should make a transfer with fee", (done: (arg?: any) => void) => {
        testCheckWith(api.accountApi.transfer(
            Helpers.CREDENTIALS,
            Helpers.ACCOUNT_NAME2,
            new AssetAmount(1),
            undefined,
            false,
            Helpers.createAssetId,
        ), { next: (c) => c.transaction.operations[0].fee!.assetId === Helpers.createAssetId, complete: () => done() });
    });

    it("should claim an asset pool", (done: (arg?: any) => void) => {
        testCheck(done, api.assetApi.claim(
            Helpers.CREDENTIALS,
            Helpers.createAsset,
            5000000,
            0,
        ));
    });

    it("should claim an asset pool from non-issuer account is not allowed", (done: (arg?: any) => void) => {
        const op = new AssetClaimFeesOperation(Helpers.ACCOUNT2, new AssetAmount(0, Helpers.createAssetId), new AssetAmount(1));
        testCheckWith(api.broadcastApi.broadcastWithCallback(ECKeyPair.parseWif(Helpers.PRIVATE2), [op]), {
            error: (e) => {
                e.should.be.instanceOf(DCoreError);
                done();
            },
        });
    });

    it("should reserve an asset", (done: (arg?: any) => void) => {
        testCheck(done, api.assetApi.reserve(
            Helpers.CREDENTIALS,
            Helpers.createAsset,
            5000000,
        ));
    });

});

{
    ([
        ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
        ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
    ] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
        const api = sdk.assetApi;

        describe(`asset API test suite for ${name}`, () => {
            after(() => {
                // wtf.dump();
            });

            let spy: Spy;

            before(() => {
                spy = create();
                // spy.log(/^API\w+/);
            });

            after(() => {
                sdk.disconnect();
                spy.teardown();
            });

            it("should return assets", (done: (arg?: any) => void) => {
                api.getAll([ChainObject.parse("1.3.10"), ChainObject.parse("1.3.13")])
                    .subscribe((value) => value.should.all.be.instanceOf(Asset), (error) => done(error), () => done());
            });

            it("should return asset", (done: (arg?: any) => void) => {
                api.get(ChainObject.parse("1.3.10"))
                    .subscribe((value) => value.should.be.instanceOf(Asset), (error) => done(error), () => done());
            });

            it("should get real supply", (done: (arg?: any) => void) => {
                api.getRealSupply()
                    .subscribe((value) => value.should.be.instanceOf(RealSupply), (error) => done(error), () => done());
            });

            it("should list 20 assets after letter c", (done: (arg?: any) => void) => {
                api.listAllRelative("C", 20)
                    .subscribe((value) => value[0].symbol.should.match(/^C.*/) && value.length.should.eq(20), (error) => done(error), () => done());
            });

            it("should list all assets with monitored", (done: (arg?: any) => void) => {
                api.listAll(true)
                    .subscribe((value) => value.some((asset) => !_.isNil(asset.monitoredAssetOpts)).should.be.true, (error) => done(error), () => done());
            });

            it("should list all assets without monitored", (done: (arg?: any) => void) => {
                api.listAll()
                    .subscribe((value) => value.every((asset) => _.isNil(asset.monitoredAssetOpts)).should.be.true, (error) => done(error), () => done());
            });

            it("should return assets by name lookup", (done: (arg?: any) => void) => {
                api.getAllByName(["USD", "CAD"])
                    .subscribe((value) => value.should.all.be.instanceOf(Asset), (error) => done(error), () => done());
            });

            it("should return asset by name lookup", (done: (arg?: any) => void) => {
                api.getByName("USD")
                    .subscribe((value) => value.should.be.instanceOf(Asset), (error) => done(error), () => done());
            });

            it("should return asset data", (done: (arg?: any) => void) => {
                api.getAssetsData([ChainObject.parse("2.3.0")])
                    .subscribe((value) => value.should.all.be.instanceOf(AssetData), (error) => done(error), () => done());
            });

            it("should convert asset to DCT", (done: (arg?: any) => void) => {
                api.convertToDCT(Helpers.createAssetId, 1000)
                    .subscribe((value) => value.amount.toNumber().should.be.eq(20), (error) => done(error), () => done());
            });

            it("should convert asset from DCT", (done: (arg?: any) => void) => {
                api.convertFromDCT(Helpers.createAssetId, 20)
                    .subscribe((value) => value.amount.toNumber().should.be.eq(1000), (error) => done(error), () => done());
            });

        });
    });
}
