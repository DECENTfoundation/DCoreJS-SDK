import { CustomOperation } from './../../src/models/operation/CustomOperation';
import * as chai from "chai";
import * as chaiThings from "chai-things";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { flatMap, map } from "rxjs/operators";
import { AssetAmount } from "../../src/models/AssetAmount";
import { TransactionConfirmation } from "../../src/models/TransactionConfirmation";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

Helpers.APIS.forEach(([name, sdk]) => {
    // const api = sdk.broadcastApi;

    describe(`broadcast API test suite for ${name}`, () => {
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

        it("should make a transfer broadcast", (done: (arg?: any) => void) => {
            sdk.accountApi.createTransfer(
                Helpers.CREDENTIALS,
                Helpers.ACCOUNT2,
                new AssetAmount(1),
                name,
                false,
            ).pipe(flatMap((op) => sdk.broadcastApi.broadcast(Helpers.PRIVATE, [op])))
                .subscribe((value: void) => undefined, (error) => done(error), () => done());
        });

        it("should make a transfer broadcast for trx", (done: (arg?: any) => void) => {
            sdk.accountApi.createTransfer(
                Helpers.CREDENTIALS,
                Helpers.ACCOUNT2,
                new AssetAmount(2),
                name,
                false,
            ).pipe(
                flatMap((op) => sdk.transactionApi.createTransaction([op])),
                map((trx) => trx.withSignature(Helpers.KEY)),
                flatMap((trx) => sdk.broadcastApi.broadcastTrx(trx)),
            ).subscribe((value: void) => undefined, (error) => done(error), () => done());
        });

        it("should make a broadcast for custom operation", (done: (arg?: any) => void) => {
            const customOperation = new CustomOperation(
                978,
                Helpers.ACCOUNT,
                [],
                Buffer.from("Any data you need here" + name).toString("hex"),
            );
            sdk.broadcastApi.broadcast(Helpers.KEY, [customOperation])
                .subscribe((value: void) => undefined, (error) => done(error), () => done());
        });

        it.skip("should make a transfer broadcast sync", (done: (arg?: any) => void) => {
            sdk.accountApi.createTransfer(
                Helpers.CREDENTIALS,
                Helpers.ACCOUNT2,
                new AssetAmount(3),
            ).pipe(flatMap((op) => sdk.broadcastApi.broadcastSynchronous(Helpers.PRIVATE, [op])))
                .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
        });

        it.skip("should make a transfer broadcast for trx sync", (done: (arg?: any) => void) => {
            sdk.accountApi.createTransfer(
                Helpers.CREDENTIALS,
                Helpers.ACCOUNT2,
                new AssetAmount(4),
            ).pipe(
                flatMap((op) => sdk.transactionApi.createTransaction([op])),
                map((trx) => trx.withSignature(Helpers.KEY)),
                flatMap((trx) => sdk.broadcastApi.broadcastTrxSynchronous(trx)),
            ).subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());
        });

    });
});
