import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { Message } from "../../src/models/Message";
import { MessageResponse } from "../../src/models/MessageResponse";
import { SendMessageOperation } from "../../src/models/operation/SendMessageOperation";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
    const api = sdk.messageApi;

    describe(`messaging API test suite for ${name}`, () => {
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

        it("should return all message operation objects", (done: (arg?: any) => void) => {
            api.getAllOperations(Helpers.ACCOUNT)
                .subscribe((value) => value.should.all.be.instanceOf(MessageResponse), (error) => done(error), () => done());
        });

        it("should return all messages", (done: (arg?: any) => void) => {
            api.getAll(Helpers.ACCOUNT)
                .subscribe((value) => value.should.all.be.instanceOf(Message), (error) => done(error), () => done());
        });

        it("should return message operation", (done: (arg?: any) => void) => {
            api.createMessageOperation(Helpers.CREDENTIALS, [[Helpers.ACCOUNT2, "hello"]])
                .subscribe((value) => value.should.be.instanceOf(SendMessageOperation), (error) => done(error), () => done());
        });

        it("should return message operation unencrypted", (done: (arg?: any) => void) => {
            api.createMessageOperationUnencrypted(Helpers.CREDENTIALS, [[Helpers.ACCOUNT2, "hello"]])
                .subscribe((value) => value.should.be.instanceOf(SendMessageOperation), (error) => done(error), () => done());
        });
    });
});
