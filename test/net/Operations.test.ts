import * as chai from "chai";
import * as WebSocket from "isomorphic-ws";
import { suite, test, timeout } from "mocha-typescript";
import * as moment from "moment";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreConstants } from "../../src/DCoreConstants";
import { DCoreSdk } from "../../src/DCoreSdk";
import { AssetAmount } from "../../src/models/AssetAmount";
import { ChainObject } from "../../src/models/ChainObject";
import { AccountCreateOperation } from "../../src/models/operation/AccountCreateOperation";
import { AddOrUpdateContentOperation } from "../../src/models/operation/AddOrUpdateContentOperation";
import { OperationType } from "../../src/models/operation/OperationType";
import { RemoveContentOperation } from "../../src/models/operation/RemoveContentOperation";
import { TransferOperation } from "../../src/models/operation/TransferOperation";
import { RegionalPrice } from "../../src/models/RegionalPrice";
import { Synopsis } from "../../src/models/Synopsis";
import { TransactionConfirmation } from "../../src/models/TransactionConfirmation";
import { Helpers } from "../Helpers";

chai.should();

@suite("blockchain based operations", timeout(20000))
// @ts-ignore
class OperationsTest {
    public static after() {
        // wtf.dump();
    }

    private api: DCoreApi;
    private spy: Spy;

    public before() {
        this.spy = create();
        this.spy.log(/^API\w+/);
        this.api = DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS, { rejectUnauthorized: false }));
    }

    public after() {
        this.api.disconnect();
        this.spy.teardown();
    }

    @test
    public "should make a transfer"(done: (arg?: any) => void) {
        const op = new TransferOperation(
            ChainObject.parse("1.2.34"),
            ChainObject.parse("1.2.35"),
            new AssetAmount(1),
        );

        this.api.broadcastApi.broadcastWithCallback(Helpers.KEY, [op])
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    }

    @test.skip
    public "should add or update a content"(done: (arg?: any) => void) {
        const op = AddOrUpdateContentOperation.create(
            ChainObject.parse("1.2.34"),
            [[ChainObject.parse("1.2.35"), 50]],
            "http://hello.world",
            new RegionalPrice(new AssetAmount(100)),
            moment.utc().add(10, "days"),
            new Synopsis("hello", "world"),
        );

        this.api.broadcastApi.broadcastWithCallback(Helpers.KEY, [op])
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    }

    @test.skip
    public "should remove a content"(done: (arg?: any) => void) {
        const op = new RemoveContentOperation(
            ChainObject.parse("1.2.34"),
            "http://hello.world",
        );

        this.api.broadcastApi.broadcastWithCallback(Helpers.KEY, [op])
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    }

    @test.skip
    public "should create an account"(done: (arg?: any) => void) {
        const op = AccountCreateOperation.create(
            ChainObject.parse("1.2.34"),
            "marian",
            Helpers.PUBKEY,
        );

        this.api.broadcastApi.broadcastWithCallback(Helpers.KEY, [op])
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    }

    @test
    public "get fee by operation type"(done: (arg?: any) => void) {
        this.api.validationApi.getFee(OperationType.Transfer2, DCoreConstants.DCT_ASSET_ID)
            .subscribe((value) => value.should.be.instanceOf(AssetAmount), (error) => done(error), () => done());
    }
}
