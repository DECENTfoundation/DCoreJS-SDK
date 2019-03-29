import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { Purchase } from "../../src/models";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
    const api = sdk.purchaseApi;

    describe(`purchase API test suite for ${name}`, () => {
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

        it("should return all purchase history", (done: (arg?: any) => void) => {
            api.getAllHistory(Helpers.ACCOUNT)
                .subscribe((value) => value.should.all.be.instanceOf(Purchase), (error) => done(error), () => done());
        });

        it("should return all open purchases", (done: (arg?: any) => void) => {
            api.getAllOpen()
                .subscribe((value) => value.should.all.be.instanceOf(Purchase), (error) => done(error), () => done());
        });

        it("should return all open purchases by uri", (done: (arg?: any) => void) => {
            api.getAllOpenByUri("http://alax.io/?scheme=alax%3A%2F%2F1%2F1&version=b711dc9b-3627-4f37-93f3-6f6f3137bcca")
                .subscribe((value) => value.should.all.be.instanceOf(Purchase), (error) => done(error), () => done());
        });

        it("should return all open purchases by account", (done: (arg?: any) => void) => {
            api.getAllOpenByAccount(Helpers.ACCOUNT)
                .subscribe((value) => value.should.all.be.instanceOf(Purchase), (error) => done(error), () => done());
        });

        // no data
        it.skip("should return purchase by URI", (done: (arg?: any) => void) => {
            api.get(Helpers.ACCOUNT2, "http://alax.io/?scheme=alax%3A%2F%2F1%2F1&version=b711dc9b-3627-4f37-93f3-6f6f3137bcca")
                .subscribe((value) => value.should.be.instanceOf(Purchase), (error) => done(error), () => done());
        });

        it("should return purchases by search", (done: (arg?: any) => void) => {
            api.findAll(Helpers.ACCOUNT2, "")
                .subscribe((value) => value.should.all.be.instanceOf(Purchase), (error) => done(error), () => done());
        });

        it("should find purchases feedback", (done: (arg?: any) => void) => {
            api.findAllForFeedback("http://alax.io/?scheme=alax%3A%2F%2F1%2F1&version=b711dc9b-3627-4f37-93f3-6f6f3137bcca")
                .subscribe((value) => value.should.all.be.instanceOf(Purchase), (error) => done(error), () => done());
        });

    });
});
