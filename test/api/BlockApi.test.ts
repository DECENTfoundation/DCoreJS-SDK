import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import * as Long from "long";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { BlockHeader } from "../../src/models/BlockHeader";
import { SignedBlock } from "../../src/models/SignedBlock";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
    const api = sdk.blockApi;

    describe(`block API test suite for ${name}`, () => {
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

        it("should return block", (done: (arg?: any) => void) => {
            api.get(Long.fromNumber(1))
                .subscribe((value) => value.should.be.instanceOf(SignedBlock), (error) => done(error), () => done());
        });

        it("should return block header", (done: (arg?: any) => void) => {
            api.getHeader(Long.fromNumber(1))
                .subscribe((value) => value.should.be.instanceOf(BlockHeader), (error) => done(error), () => done());
        });

        it("should return head block time", (done: (arg?: any) => void) => {
            api.getHeadTime()
                .subscribe((value) => undefined, (error) => done(error), () => done());
        });

    });
});
