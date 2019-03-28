import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import * as moment from "moment";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { ChainProperties, DynamicGlobalProperties, GlobalProperties, MinerRewardInput } from "../../src/models";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
    const api = sdk.generalApi;

    describe(`general API test suite for ${name}`, () => {
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

        it("should return chain props", (done: (arg?: any) => void) => {
            api.getChainProperties()
                .subscribe((value) => value.should.be.instanceOf(ChainProperties), (error) => done(error), () => done());
        });

        it("should return global props", (done: (arg?: any) => void) => {
            api.getGlobalProperties()
                .subscribe((value) => value.should.be.instanceOf(GlobalProperties), (error) => done(error), () => done());
        });

        it("should return config", (done: (arg?: any) => void) => {
            api.getConfig()
                .subscribe((value) => value.should.be.a("object"), (error) => done(error), () => done());
        });

        it("should return chain id", (done: (arg?: any) => void) => {
            api.getChainId()
                .subscribe((value) => value.should.be.a("string"), (error) => done(error), () => done());
        });

        it("should return dynamic global properties", (done: (arg?: any) => void) => {
            api.getDynamicGlobalProperties()
                .subscribe((value) => value.should.be.instanceOf(DynamicGlobalProperties), (error) => done(error), () => done());
        });

        it("should return time to maintenance", (done: (arg?: any) => void) => {
            api.getTimeToMaintenance(moment())
                .subscribe((value) => value.should.be.instanceOf(MinerRewardInput), (error) => done(error), () => done());
        });

    });
});
