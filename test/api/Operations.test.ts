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
import { AssetFormatter } from "../../src/models/AssetFormatter";
import { ChainObject } from "../../src/models/ChainObject";
import { DCoreError } from "../../src/models/error/DCoreError";
import { ExchangeRate } from "../../src/models/ExchangeRate";
import { AssetClaimFeesOperation } from "../../src/models/operation/AssetClaimFeesOperation";
import { AssetFundPoolsOperation } from "../../src/models/operation/AssetFundPoolsOperation";
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
    let timestamp: string;
    let uri: string;
    let asset: string;
    let account: string;

    before(() => {
        spy = create();
        spy.log(/^API\w+/);
        api = DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS));
        // timestamp = "1556786841";
        timestamp = moment.utc().unix().toString();
        uri = "http://hello.world.io?timestamp=" + timestamp;
        asset = "SDK." + timestamp + "T";
        account = "sdk-account-" + timestamp;
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

    it("should add a content", (done: (arg?: any) => void) => {
        api.contentApi.add(
            Helpers.CREDENTIALS,
            [[Helpers.ACCOUNT2, 50]],
            uri,
            [new RegionalPrice(new AssetAmount(2))],
            moment.utc().add(100, "days"),
            new Synopsis("hello", "world"),
        )
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should update a content", (done: (arg?: any) => void) => {
        api.contentApi.update(
            Helpers.CREDENTIALS,
            uri,
            (old) => new Synopsis(old.title, "update"),
        )
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should make a purchase", (done: (arg?: any) => void) => {
        api.contentApi.purchase(
            Helpers.CREDENTIALS,
            uri,
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it.skip("should rate and comment a purchased content", (done: (arg?: any) => void) => {
        api.purchaseApi.rateAndComment(
            Helpers.CREDENTIALS,
            uri,
            4,
            "hello comment",
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should remove a content", (done: (arg?: any) => void) => {
        api.contentApi.remove(Helpers.CREDENTIALS, uri)
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should create an account", (done: (arg?: any) => void) => {
        api.accountApi.create(Helpers.CREDENTIALS, account, Helpers.PUBLIC)
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should make a transfer", (done: (arg?: any) => void) => {
        api.accountApi.transfer(
            Helpers.CREDENTIALS,
            account,
            AssetFormatter.DCT.amount(1),
            timestamp.toString(),
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should update an account", (done: (arg?: any) => void) => {
        api.accountApi.createCredentials(account, Helpers.PRIVATE)
            .pipe(flatMap((creds) =>
                api.accountApi.update(creds, (old) => {
                    old.allowSubscription = !old.allowSubscription;
                    old.subscriptionPeriod = 1;
                    old.pricePerSubscribe = new AssetAmount(1);
                    return old;
                }),
            ))
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should vote", (done: (arg?: any) => void) => {
        api.accountApi.createCredentials(account, Helpers.PRIVATE)
            .pipe(flatMap((creds) => api.miningApi.vote(creds, [ChainObject.parse("1.4.5")])))
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should make a transfer to content", (done: (arg?: any) => void) => {
        api.contentApi.transfer(
            Helpers.CREDENTIALS,
            ChainObject.parse("2.13.3"),
            new AssetAmount(1),
            timestamp.toString(),
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should send a message", (done: (arg?: any) => void) => {
        api.messageApi.send(
            Helpers.CREDENTIALS,
            [[Helpers.ACCOUNT2, "test message t=" + timestamp]],
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should send a message unencrypted", (done: (arg?: any) => void) => {
        api.messageApi.sendUnencrypted(
            Helpers.CREDENTIALS,
            [[Helpers.ACCOUNT2, "test message t=" + timestamp]],
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should create an asset", (done: (arg?: any) => void) => {
        api.assetApi.create(
            Helpers.CREDENTIALS,
            asset,
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
        api.assetApi.update(
            Helpers.CREDENTIALS,
            asset,
            (old) => new ExchangeRate(new AssetAmount(1), new AssetAmount(2, old.id)),
            (old) => old.description + " hello new api",
            (old) => true,
            (old) => old.options.maxSupply / 2,
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should update advanced asset", (done: (arg?: any) => void) => {
        api.assetApi.updateAdvanced(
            Helpers.CREDENTIALS,
            asset,
            6,
            false,
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should issue an asset", (done: (arg?: any) => void) => {
        api.assetApi.issue(
            Helpers.CREDENTIALS,
            ChainObject.parse("1.3.40"),
            200000,
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should fund an asset pool", (done: (arg?: any) => void) => {
        api.assetApi.fund(
            Helpers.CREDENTIALS,
            ChainObject.parse("1.3.40"),
            0,
            100000, // 0.01 dct fee
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should fund an asset pool from non-issuer account", (done: (arg?: any) => void) => {
        const op = new AssetFundPoolsOperation(Helpers.ACCOUNT2, new AssetAmount(0, ChainObject.parse("1.3.36")), new AssetAmount(500));
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
        api.assetApi.claim(
            Helpers.CREDENTIALS,
            ChainObject.parse("1.3.40"),
            200000,
            0,
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

    it("should claim an asset pool from non-issuer account is not allowed", (done: (arg?: any) => void) => {
        const op = new AssetClaimFeesOperation(Helpers.ACCOUNT2, new AssetAmount(0, ChainObject.parse("1.3.36")), new AssetAmount(500));
        api.broadcastApi.broadcastWithCallback(ECKeyPair.parseWif(Helpers.PRIVATE2), [op])
            .pipe(catchError((err) => err instanceof DCoreError ? of(true) : throwError(err)))
            .subscribe((value) => value.should.be.true, (error) => done(error), () => done());
    });

    it("should reserve an asset", (done: (arg?: any) => void) => {
        api.assetApi.reserve(
            Helpers.CREDENTIALS,
            ChainObject.parse("1.3.40"),
            200000,
        ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
    });

});
