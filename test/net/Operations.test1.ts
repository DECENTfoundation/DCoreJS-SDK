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
import { TransferOperation } from "../../src/models/operation/TransferOperation";
import { RegionalPrice } from "../../src/models/RegionalPrice";
import { Synopsis } from "../../src/models/Synopsis";
import { TransactionConfirmation } from "../../src/models/TransactionConfirmation";
import { Helpers } from "../Helpers1";

chai.should();

describe("blockchain based operations", () => {
        let api: DCoreApi;
        let spy: Spy;

        before(() => {
            spy = create();
            spy.log(/^API\w+/);
            api = DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS, { rejectUnauthorized: false }));
        });

        after(() => {
            api.disconnect();
            spy.teardown();
        });

        it("should make a transfer", (done: (arg?: any) => void) => {
            const op = new TransferOperation(
                ChainObject.parse("1.2.34"),
                ChainObject.parse("1.2.35"),
                new AssetAmount(1),
            );

            api.broadcastApi.broadcastWithCallback(Helpers.KEY, [op])
                .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
        });

        it.skip("should add or update a content", (done: (arg?: any) => void) => {
            const op = AddOrUpdateContentOperation.create(
                ChainObject.parse("1.2.34"),
                [[ChainObject.parse("1.2.35"), 50]],
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
                ChainObject.parse("1.2.34"),
                "http://hello.world",
            );

            api.broadcastApi.broadcastWithCallback(Helpers.KEY, [op])
                .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
        });

        it.skip("should create an account", (done: (arg?: any) => void) => {
            const op = AccountCreateOperation.create(
                ChainObject.parse("1.2.34"),
                "marian",
                Helpers.PUBKEY,
            );

            api.broadcastApi.broadcastWithCallback(Helpers.KEY, [op])
                .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
        });
}); //
