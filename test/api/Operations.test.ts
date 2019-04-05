import * as chai from "chai";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import * as moment from "moment";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { AssetAmount } from "../../src/models/AssetAmount";
import { ChainObject } from "../../src/models/ChainObject";
import { AccountCreateOperation } from "../../src/models/operation/AccountCreateOperation";
import { AddOrUpdateContentOperation } from "../../src/models/operation/AddOrUpdateContentOperation";
import { RemoveContentOperation } from "../../src/models/operation/RemoveContentOperation";
import { RegionalPrice } from "../../src/models/RegionalPrice";
import { Synopsis } from "../../src/models/Synopsis";
import { TransactionConfirmation } from "../../src/models/TransactionConfirmation";
import { Helpers } from "../Helpers";

chai.should();

describe("blockchain based operations", () => {
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

    it.skip("should add or update a content", (done: (arg?: any) => void) => {
        const op = AddOrUpdateContentOperation.create(
            Helpers.ACCOUNT,
            [[Helpers.ACCOUNT2, 50]],
            "http://hello.world",
            new RegionalPrice(new AssetAmount(100)),
            moment.utc().add(10, "days"),
            new Synopsis("hello", "world"),
        );

        api.broadcastApi.broadcastWithCallback(Helpers.KEY, [op])
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it.skip("should remove a content", (done: (arg?: any) => void) => {
        const op = new RemoveContentOperation(
            Helpers.ACCOUNT,
            "http://hello.world",
        );

        api.broadcastApi.broadcastWithCallback(Helpers.KEY, [op])
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it.skip("should create an account", (done: (arg?: any) => void) => {
        const op = AccountCreateOperation.create(
            Helpers.ACCOUNT,
            "marian",
            Helpers.PUBLIC,
        );

        api.broadcastApi.broadcastWithCallback(Helpers.KEY, [op])
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should make a transfer high level", (done: (arg?: any) => void) => {
        api.accountApi.transfer(
            Helpers.CREDENTIALS,
            Helpers.ACCOUNT2,
            new AssetAmount(1),
        )
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should make a transfer to content", (done: (arg?: any) => void) => {
        api.contentApi.transfer(
            Helpers.CREDENTIALS,
            ChainObject.parse("2.13.3"),
            new AssetAmount(1),
        )
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should vote", (done: (arg?: any) => void) => {
        api.miningApi.vote(
            Helpers.CREDENTIALS,
            [ChainObject.parse("1.4.5")])
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should send a message", (done: (arg?: any) => void) => {
        api.messageApi.send(
            Helpers.CREDENTIALS,
            [[Helpers.ACCOUNT2, "test message"]])
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should send a message unencrypted", (done: (arg?: any) => void) => {
        api.messageApi.sendUnencrypted(
            Helpers.CREDENTIALS,
            [[Helpers.ACCOUNT2, "test message"]])
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

});
