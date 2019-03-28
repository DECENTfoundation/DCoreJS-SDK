import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
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

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
    const api = sdk.balanceApi;

    describe(`balance API test suite for ${name}`, () => {
        after(() => {
            // wtf.dump();
        });

        let spy: Spy;

        before(() => {
            spy = create();
            // this.spy.log(/^API\w+/);
        });

        after(() => {
            sdk.disconnect();
            spy.teardown();
        });

        it("should return asset balances for the account", (done: (arg?: any) => void) => {
            api.getAll("1.2.35")
                .subscribe((value) => value.should.all.be.instanceOf(AssetAmount), (error) => done(error), () => done());
        });

        it("should return asset balances with asset for the account", (done: (arg?: any) => void) => {
            api.getAllWithAsset("1.2.35", ["DCT"])
                .subscribe((value) => value[0][0].should.be.instanceOf(Asset) && value[0][1].should.be.instanceOf(AssetAmount), (error) => done(error), () => done());
        });

        it("should return all vesting balances for the account", (done: (arg?: any) => void) => {
            api.getAllVesting(Helpers.ACCOUNT)
                .subscribe((value) => value.should.all.be.instanceOf(VestingBalance), (error) => done(error), () => done());
        });

    });
});
