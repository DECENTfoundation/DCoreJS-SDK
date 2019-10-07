import * as chai from "chai";
import * as chaiThings from "chai-things";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { flatMap, map } from "rxjs/operators";
import { AssetAmount, ChainObject, ProcessedTransaction, Transaction, TransactionConfirmation, TransferOperation } from "../../src/models";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

Helpers.APIS.forEach(([name, sdk]) => {
    const api = sdk.transactionApi;

    const trxo = () => sdk.historyApi.getOperation(Helpers.ACCOUNT, ChainObject.parse("1.7.1")).pipe(
        flatMap((op) => api.get(op.operation.blockNum, 0)),
    );

    describe(`transaction API test suite for ${name}`, () => {
        after(() => {
            // wtf.dump();
        });

        let spy: Spy;

        before(() => {
            spy = create();
            // spy.log(/^API\w+/);
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

        it("should return transaction by id", (done: (arg?: any) => void) => {
            trxo().pipe(flatMap((t) => api.getById(t.id)))
                .subscribe((value) => value.should.be.instanceOf(ProcessedTransaction), (error) => done(error), () => done());
        });

        it("should return transaction", (done: (arg?: any) => void) => {
            trxo().subscribe((value) => value.should.be.instanceOf(ProcessedTransaction), (error) => done(error), () => done());
        });

        it("should return transaction by confirmation", (done: (arg?: any) => void) => {
            trxo().pipe(
                map((trx) => {
                    const tc = new TransactionConfirmation();
                    tc.blockNum = trx.refBlockNum;
                    tc.transaction = trx;
                    tc.trxNum = 0;
                    tc.id = trx.id;
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
