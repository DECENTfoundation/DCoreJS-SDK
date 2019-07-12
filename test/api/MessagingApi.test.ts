import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { Credentials } from "../../src/crypto/Credentials";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { Message } from "../../src/models/Message";
import { MessageResponse } from "../../src/models/MessageResponse";
import { SendMessageOperation } from "../../src/models/operation/SendMessageOperation";
import { Helpers, testCheck } from "../Helpers";

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

    it("should send a message", (done: (arg?: any) => void) => {
        testCheck(done, api.messageApi.send(
            Helpers.CREDENTIALS,
            [[Helpers.ACCOUNT2, "test message encrypted"]],
        ));
    });

    it("should send a message unencrypted", (done: (arg?: any) => void) => {
        testCheck(done, api.messageApi.sendUnencrypted(
            Helpers.CREDENTIALS,
            [[Helpers.ACCOUNT2, "test message plain"]],
        ));
    });

});

Helpers.APIS.forEach(([name, sdk]) => {
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

        it("should return all decrypted messages", (done: (arg?: any) => void) => {
            api.getAllDecrypted(new Credentials(Helpers.ACCOUNT2, Helpers.PRIVATE2), Helpers.ACCOUNT, Helpers.ACCOUNT2)
                .subscribe((value) => value.map((msg) => msg.encrypted).should.all.be.eq(false), (error) => done(error), () => done());
        });

        it("should return all decrypted messages for sender", (done: (arg?: any) => void) => {
            api.getAllDecryptedForSender(Helpers.CREDENTIALS)
                .subscribe((value) => value.map((msg) => msg.encrypted).should.all.be.eq(false), (error) => done(error), () => done());
        });

        it("should return all decrypted messages for receiver", (done: (arg?: any) => void) => {
            api.getAllDecryptedForReceiver(Helpers.CREDENTIALS)
                .subscribe((value) => value.map((msg) => msg.encrypted).should.all.be.eq(false), (error) => done(error), () => done());
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
