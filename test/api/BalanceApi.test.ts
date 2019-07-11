import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import * as Logger from "js-logger";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { Asset } from "../../src/models/Asset";
import { AssetAmount } from "../../src/models/AssetAmount";
import { ChainObject } from "../../src/models/ChainObject";
import { VestingBalance } from "../../src/models/VestingBalance";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

Logger.useDefaults();

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false }, Helpers.LOGGER)],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS), Helpers.LOGGER)],
] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
    const api = sdk.balanceApi;

    describe(`balance API test suite for ${name}`, () => {
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

        it("should return asset balance for the account", (done: (arg?: any) => void) => {
            api.get(Helpers.ACCOUNT, ChainObject.parse("1.3.0"))
                .subscribe((value) => value.should.be.instanceOf(AssetAmount), (error) => done(error), () => done());
        });

        it("should return all asset balances for the account", (done: (arg?: any) => void) => {
            api.getAll(Helpers.ACCOUNT)
                .subscribe((value) => value.should.all.be.instanceOf(AssetAmount), (error) => done(error), () => done());
        });

        it("should return asset balance with asset for the account", (done: (arg?: any) => void) => {
            api.getWithAsset(Helpers.ACCOUNT, "DCT")
                .subscribe((value) => value[0].should.be.instanceOf(Asset) && value[1].should.be.instanceOf(AssetAmount), (error) => done(error), () => done());
        });

        it("should return all asset balances with asset for the account", (done: (arg?: any) => void) => {
            api.getAllWithAsset(Helpers.ACCOUNT)
                .subscribe((value) => value[0][0].should.be.instanceOf(Asset) && value[0][1].should.be.instanceOf(AssetAmount), (error) => done(error), () => done());
        });

        it("should return all vesting balances for the account", (done: (arg?: any) => void) => {
            api.getAllVesting(Helpers.ACCOUNT)
                .subscribe((value) => value.should.all.be.instanceOf(VestingBalance), (error) => done(error), () => done());
        });

    });
});
