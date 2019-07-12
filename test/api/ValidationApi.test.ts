import * as chai from "chai";
import * as chaiThings from "chai-things";
import "mocha";
import * as moment from "moment";
import "reflect-metadata";
import { Observable } from "rxjs";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { flatMap } from "rxjs/operators";
import { Address } from "../../src/crypto/Address";
import { Memo, OperationType, ProcessedTransaction, Transaction, TransferOperation } from "../../src/models";
import { AssetAmount } from "../../src/models/AssetAmount";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

Helpers.APIS.forEach(([name, sdk]) => {
    const api = sdk.validationApi;
    let trx: Observable<Transaction>;

    describe(`validation API test suite for ${name}`, () => {
        after(() => {
            // wtf.dump();
        });

        let spy: Spy;

        before(() => {
            trx = sdk.transactionApi.createTransaction([
                new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(10), Memo.createPublic(moment.utc().unix().toString())),
            ]);
            spy = create();
            // spy.log(/^API\w+/);
        });

        after(() => {
            sdk.disconnect();
            spy.teardown();
        });

        it("should return required signatures", (done: (arg?: any) => void) => {
            trx.pipe(flatMap((t) => api.getRequiredSignatures(t, [])))
                .subscribe((value) => value.should.all.be.instanceOf(Address), (error) => done(error), () => done());
        });

        it("should return potential signatures", (done: (arg?: any) => void) => {
            trx.pipe(flatMap((t) => api.getPotentialSignatures(t)))
                .subscribe((value) => value.should.all.be.instanceOf(Address), (error) => done(error), () => done());
        });

        it("should return verify authority", (done: (arg?: any) => void) => {
            trx.pipe(flatMap((t) => api.verifyAuthority(t.withSignature(Helpers.KEY))))
                .subscribe((value) => value.should.be.true, (error) => done(error), () => done());
        });

        it("should return verify account authority", (done: (arg?: any) => void) => {
            api.verifyAccountAuthority(Helpers.ACCOUNT_NAME, [Helpers.PUBLIC])
                .subscribe((value) => value.should.be.true, (error) => done(error), () => done());
        });

        it("should return validate trx", (done: (arg?: any) => void) => {
            trx.pipe(flatMap((t) => api.validateTransaction(t.withSignature(Helpers.KEY))))
                .subscribe((value) => value.should.be.instanceOf(ProcessedTransaction), (error) => done(error), () => done());
        });

        it("should return required fees for operation type", (done: (arg?: any) => void) => {
            api.getFee(OperationType.Transfer)
                .subscribe((value) => value.should.be.instanceOf(AssetAmount), (error) => done(error), () => done());
        });

    });
});
