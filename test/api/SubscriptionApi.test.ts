import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { ChainObject } from "../../src/models/ChainObject";
import { Subscription } from "../../src/models/Subscription";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
    const api = sdk.subscriptionApi;

        // no subscriptions
    describe.skip(`subscription API test suite for ${name}`, () => {
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

        it("should return subscription by id", (done: (arg?: any) => void) => {
            api.get(ChainObject.parse("2.15.1"))
                .subscribe((value) => value.should.be.instanceOf(Subscription), (error) => done(error), () => done());
        });

        it("should return all active subscriptions consumer", (done: (arg?: any) => void) => {
            api.getAllActiveByConsumer(ChainObject.parse("1.2.62"))
                .subscribe((value) => value.should.all.be.instanceOf(Subscription), (error) => done(error), () => done());
        });

        it("should return all active subscriptions author", (done: (arg?: any) => void) => {
            api.getAllActiveByAuthor(ChainObject.parse("1.2.62"))
                .subscribe((value) => value.should.all.be.instanceOf(Subscription), (error) => done(error), () => done());
        });

        it("should return all subscriptions consumer", (done: (arg?: any) => void) => {
            api.getAllByConsumer(ChainObject.parse("1.2.15"))
                .subscribe((value) => value.should.all.be.instanceOf(Subscription), (error) => done(error), () => done());
        });

        it("should return all subscriptions author", (done: (arg?: any) => void) => {
            api.getAllByAuthor(ChainObject.parse("1.2.62"))
                .subscribe((value) => value.should.all.be.instanceOf(Subscription), (error) => done(error), () => done());
        });

    });
});
