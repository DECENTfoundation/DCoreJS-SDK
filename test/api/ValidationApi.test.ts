import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { flatMap } from "rxjs/operators";
import { Address } from "../../src/crypto/Address";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { OperationType, ProcessedTransaction, TransferOperation } from "../../src/models";
import { AssetAmount } from "../../src/models/AssetAmount";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
    const api = sdk.validationApi;
    const trx = sdk.transactionApi.createTransaction([new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(10))]);

    describe(`validation API test suite for ${name}`, () => {
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
