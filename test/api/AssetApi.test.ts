import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import * as _ from "lodash";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { Asset, ChainObject, RealSupply } from "../../src/models";
import { AssetData } from "../../src/models/AssetData";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

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
                api.getAll([ChainObject.parse("1.3.10")])
                    .subscribe((value) => value.should.include.one.instanceOf(Asset), (error) => done(error), () => done());
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
                api.convertToDCT(ChainObject.parse("1.3.33"), 3000000)
                    .subscribe((value) => value.amount.toNumber().should.be.eq(3), (error) => done(error), () => done());
            });

            it("should convert asset from DCT", (done: (arg?: any) => void) => {
                api.convertFromDCT(ChainObject.parse("1.3.33"), 3)
                    .subscribe((value) => value.amount.toNumber().should.be.eq(3000000), (error) => done(error), () => done());
            });

        });
    });
}
