import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { BalanceChange, ChainObject, OperationHistory } from "../../src/models";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
    const api = sdk.historyApi;

    describe(`history API test suite for ${name}`, () => {
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

        it("should return history operation", (done: (arg?: any) => void) => {
            api.getOperation(Helpers.ACCOUNT, ChainObject.parse("1.7.7570"))
                .subscribe((value) => value.should.be.instanceOf(BalanceChange), (error) => done(error), () => done());
        });

        it("should return account history", (done: (arg?: any) => void) => {
            api.listOperations(Helpers.ACCOUNT)
                .subscribe((value) => value.should.all.be.instanceOf(OperationHistory), (error) => done(error), () => done());
        });

        it("should return account history relative", (done: (arg?: any) => void) => {
            api.listOperationsRelative(Helpers.ACCOUNT)
                .subscribe((value) => value.should.all.be.instanceOf(OperationHistory), (error) => done(error), () => done());
        });

        it("should find account history", (done: (arg?: any) => void) => {
            api.findAllOperations(Helpers.ACCOUNT)
                .subscribe((value) => value.should.all.be.instanceOf(BalanceChange), (error) => done(error), () => done());
        });

    });
});
