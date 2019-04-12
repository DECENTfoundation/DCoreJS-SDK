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
import { AssetAmount } from "../../src/models/AssetAmount";
import { TransactionConfirmation } from "../../src/models/TransactionConfirmation";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
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
