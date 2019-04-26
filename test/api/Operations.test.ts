import * as chai from "chai";
import { deserialize, serialize } from "class-transformer";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import * as moment from "moment";
import "reflect-metadata";
import { of, throwError } from "rxjs";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { catchError, flatMap, map, tap } from "rxjs/operators";
import { ECKeyPair } from "../../src/crypto/ECKeyPair";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { AssetAmount } from "../../src/models/AssetAmount";
import { ChainObject } from "../../src/models/ChainObject";
import { DCoreError } from "../../src/models/error/DCoreError";
import { ExchangeRate } from "../../src/models/ExchangeRate";
import { AccountCreateOperation } from "../../src/models/operation/AccountCreateOperation";
import { AddOrUpdateContentOperation } from "../../src/models/operation/AddOrUpdateContentOperation";
import { AssetClaimFeesOperation } from "../../src/models/operation/AssetClaimFeesOperation";
import { AssetFundPoolsOperation } from "../../src/models/operation/AssetFundPoolsOperation";
import { RemoveContentOperation } from "../../src/models/operation/RemoveContentOperation";
import { TransferOperation } from "../../src/models/operation/TransferOperation";
import { RegionalPrice } from "../../src/models/RegionalPrice";
import { Synopsis } from "../../src/models/Synopsis";
import { Transaction } from "../../src/models/Transaction";
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

    it("should re-create a transaction from plain and apply", (done: (arg?: any) => void) => {
        api.transactionApi.createTransaction([new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(10))]).pipe(
            map((trx) => trx.withSignature(Helpers.KEY)),
            map((trx) => [trx, deserialize(Transaction, serialize(trx))]),
            tap(([trx, sigTrx]) => serialize(trx).should.eq(serialize(sigTrx))),
            flatMap(([trx, sigTrx]) => api.broadcastApi.broadcastTrxWithCallback(sigTrx)),
        )
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    // create fails on exist, update fails on expiration update
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

    // already expired
    it.skip("should remove a content", (done: (arg?: any) => void) => {
        const op = new RemoveContentOperation(
            Helpers.ACCOUNT,
            "http://hello.world",
        );

        api.broadcastApi.broadcastWithCallback(Helpers.KEY, [op])
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    // account exist
    it.skip("should create an account", (done: (arg?: any) => void) => {
        const op = AccountCreateOperation.create(
            Helpers.ACCOUNT,
            "marian",
            Helpers.PUBLIC,
        );

        api.broadcastApi.broadcastWithCallback(Helpers.KEY, [op])
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should make a transfer", (done: (arg?: any) => void) => {
        api.accountApi.transfer(
            Helpers.CREDENTIALS,
            Helpers.ACCOUNT2,
            new AssetAmount(1),
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should make a transfer to content", (done: (arg?: any) => void) => {
        api.contentApi.transfer(
            Helpers.CREDENTIALS,
            ChainObject.parse("2.13.3"),
            new AssetAmount(1),
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    // already purchased
    it.skip("should make a purchase", (done: (arg?: any) => void) => {
        api.contentApi.purchase(
            Helpers.CREDENTIALS,
            "2.13.3",
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should vote", (done: (arg?: any) => void) => {
        api.miningApi.vote(
            Helpers.CREDENTIALS,
            [ChainObject.parse("1.4.5")],
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should send a message", (done: (arg?: any) => void) => {
        api.messageApi.send(
            Helpers.CREDENTIALS,
            [[Helpers.ACCOUNT2, "test message"]],
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should send a message unencrypted", (done: (arg?: any) => void) => {
        api.messageApi.sendUnencrypted(
            Helpers.CREDENTIALS,
            [[Helpers.ACCOUNT2, "test message"]],
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    // already commented
    it.skip("should rate and comment a purchased content", (done: (arg?: any) => void) => {
        api.purchaseApi.rateAndComment(
            Helpers.CREDENTIALS,
            "ipfs:QmWBoRBYuxzH5a8d3gssRbMS5scs6fqLKgapBfqVNUFUtZ",
            4,
            "hello comment",
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    // asset 'SDK' is 1.3.35
    it.skip("should create an asset", (done: (arg?: any) => void) => {
        api.assetApi.create(
            Helpers.CREDENTIALS,
            "SDK",
            12,
            "hello api",
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    // account_id_type fee_payer()const { return monitored_asset_opts.valid() ? account_id_type() : issuer; }
    // therefore Missing Active Authority 1.2.0
    /*
        it.skip("should create a monitored asset", (done: (arg?: any) => void) => {
            api.assetApi.createMonitoredAsset(
                Helpers.CREDENTIALS,
                "MSDK",
                4,
                "hello api monitored",
            ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
        });
    */

    it("should update an asset", (done: (arg?: any) => void) => {
        const asset = ChainObject.parse("1.3.40");
        const ex = new ExchangeRate(new AssetAmount(1), new AssetAmount(2, asset));
        api.assetApi.update(
            Helpers.CREDENTIALS,
            asset,
            ex,
            "hello new api",
            true,
            500000,
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    // fails on old values
    it.skip("should update advanced asset", (done: (arg?: any) => void) => {
        const asset = ChainObject.parse("1.3.41");
        api.assetApi.updateAdvanced(
            Helpers.CREDENTIALS,
            asset,
            6,
            false,
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should issue an asset", (done: (arg?: any) => void) => {
        const asset = ChainObject.parse("1.3.40");
        api.assetApi.issue(
            Helpers.CREDENTIALS,
            asset,
            200000,
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should fund an asset pool", (done: (arg?: any) => void) => {
        const asset = ChainObject.parse("1.3.40");
        api.assetApi.fund(
            Helpers.CREDENTIALS,
            asset,
            0,
            100000, // 0.01 dct fee
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should fund an asset pool from non-issuer account", (done: (arg?: any) => void) => {
        const asset = ChainObject.parse("1.3.36");
        const op = new AssetFundPoolsOperation(Helpers.ACCOUNT2, new AssetAmount(0, asset), new AssetAmount(500));
        api.broadcastApi.broadcastWithCallback(ECKeyPair.parseWif(Helpers.PRIVATE2), [op])
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should make a transfer with fee", (done: (arg?: any) => void) => {
        api.accountApi.transfer(
            Helpers.CREDENTIALS,
            Helpers.ACCOUNT2,
            new AssetAmount(1),
            undefined,
            undefined,
            ChainObject.parse("1.3.40"),
        ).subscribe((value) => value.transaction.operations[0].fee!.assetId.objectId.should.be.eq("1.3.40"), (error) => done(error), () => done());
    });

    it("should claim an asset pool", (done: (arg?: any) => void) => {
        const asset = ChainObject.parse("1.3.40");
        api.assetApi.claim(
            Helpers.CREDENTIALS,
            asset,
            200000,
            0,
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should claim an asset pool from non-issuer account is not allowed", (done: (arg?: any) => void) => {
        const asset = ChainObject.parse("1.3.36");
        const op = new AssetClaimFeesOperation(Helpers.ACCOUNT2, new AssetAmount(0, asset), new AssetAmount(500));
        api.broadcastApi.broadcastWithCallback(ECKeyPair.parseWif(Helpers.PRIVATE2), [op])
            .pipe(catchError((err) => err instanceof DCoreError ? of(true) : throwError(err)))
            .subscribe((value) => value.should.be.true, (error) => done(error), () => done());
    });

    it("should reserve an asset", (done: (arg?: any) => void) => {
        const asset = ChainObject.parse("1.3.40");
        api.assetApi.reserve(
            Helpers.CREDENTIALS,
            asset,
            200000,
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

});
