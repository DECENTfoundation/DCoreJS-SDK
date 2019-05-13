import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { flatMap, map } from "rxjs/operators";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { AssetAmount, ObjectNotFoundError, ProcessedTransaction, Transaction, TransactionConfirmation, TransferOperation } from "../../src/models";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
    const api = sdk.transactionApi;

    describe(`transaction API test suite for ${name}`, () => {
        after(() => {
            // wtf.dump();
        });

        let spy: Spy;

        before(() => {
            spy = create();
            spy.log(/^API\w+/);
        });

        after(() => {
            sdk.disconnect();
            spy.teardown();
        });

        it("should create transaction", (done: (arg?: any) => void) => {
            api.createTransaction([new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(10))])
                .subscribe((value) => value.should.be.instanceOf(Transaction), (error) => done(error), () => done());
        });

        it("should return all proposed transaction", (done: (arg?: any) => void) => {
            api.getAllProposed(Helpers.ACCOUNT)
                .subscribe((value) => value.should.all.be.a("object"), (error) => done(error), () => done());
        });
        // will not work after `expiration: '2018-07-26T11:27:07'` since the transaction will be removed from recent poo
        it("should return recent transaction", (done: (arg?: any) => void) => {
            api.getRecent("abb2c83679c2217bd20bed723f3a9ffa8653a953")
                .subscribe(undefined, (error) => {
                    error.should.be.instanceOf(ObjectNotFoundError);
                    done();
                }, () => done());
        });

        it("should return transaction by id", (done: (arg?: any) => void) => {
            api.getById("abb2c83679c2217bd20bed723f3a9ffa8653a953")
                .subscribe((value) => value.should.be.instanceOf(ProcessedTransaction), (error) => done(error), () => done());
        });

        it("should compute same transaction id", (done: (arg?: any) => void) => {
            api.getById("abb2c83679c2217bd20bed723f3a9ffa8653a953")
                .subscribe((value) => value.id.should.be.equal("abb2c83679c2217bd20bed723f3a9ffa8653a953"), (error) => done(error), () => done());
        });

        it("should return transaction", (done: (arg?: any) => void) => {
            api.get(446532, 0)
                .subscribe((value) => value.should.be.instanceOf(ProcessedTransaction), (error) => done(error), () => done());
        });

        it("should return transaction by confirmation", (done: (arg?: any) => void) => {
            api.get(446532, 0).pipe(
                map((trx) => {
                    const tc = new TransactionConfirmation();
                    tc.blockNum = 446532;
                    tc.transaction = trx;
                    tc.trxNum = 0;
                    tc.id = "abb2c83679c2217bd20bed723f3a9ffa8653a953";
                    return tc;
                }),
                flatMap((tc) => api.getByConfirmation(tc)),
            )
                .subscribe((value) => value.should.be.instanceOf(ProcessedTransaction), (error) => done(error), () => done());
        });

        it("should get transaction hex", (done: (arg?: any) => void) => {
            api.createTransaction([new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(10))]).pipe(
                flatMap((trx) => api.getHexDump(trx)),
            )
                .subscribe((value) => value.should.be.a("string"), (error) => done(error), () => done());
        });

    });
});
