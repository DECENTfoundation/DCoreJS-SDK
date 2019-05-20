import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import * as Long from "long";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { flatMap } from "rxjs/operators";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { AccountStatistics, ChainObject, FullAccount } from "../../src/models";
import { Account } from "../../src/models/Account";
import { AssetAmount } from "../../src/models/AssetAmount";
import { TransferOperation } from "../../src/models/operation/TransferOperation";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
    const api = sdk.accountApi;

    describe(`account API test suite for ${name}`, () => {
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

        it("account should exist", (done: (arg?: any) => void) => {
            api.exist(Helpers.ACCOUNT)
                .subscribe((value) => value.should.be.true, (error) => done(error), () => done());
        });

        it("account should not exist", (done: (arg?: any) => void) => {
            api.exist("1.2.99999999999")
                .subscribe((value) => value.should.be.false, (error) => done(error), () => done());
        });

        it("should return account by name", (done: (arg?: any) => void) => {
            api.getByName(Helpers.ACCOUNT_NAME)
                .subscribe((value) => value.should.be.instanceOf(Account), (error) => done(error), () => done());
        });

        it("should return account count", (done: (arg?: any) => void) => {
            api.countAll()
                .subscribe((value) => value.should.be.instanceOf(Long), (error) => done(error), () => done());
        });

        it("should return account ids for key references", (done: (arg?: any) => void) => {
            api.findAllReferencesByKeys([Helpers.PUBLIC])
                .subscribe((value) => value.should.include.one.include.one.instanceOf(ChainObject), (error) => done(error), () => done());
        });

        it("should return account ids for account references", (done: (arg?: any) => void) => {
            api.findAllReferencesByAccount(Helpers.ACCOUNT)
                .subscribe((value) => value.length.should.eq(0), (error) => done(error), () => done());
        });

        it("should return account by id", (done: (arg?: any) => void) => {
            api.getAll([Helpers.ACCOUNT2])
                .subscribe((value) => value.should.include.one.instanceOf(Account), (error) => done(error), () => done());
        });

        it("should return full account by id", (done: (arg?: any) => void) => {
            api.getFullAccounts([Helpers.ACCOUNT2.objectId], false)
                .subscribe((value) => value.get(Helpers.ACCOUNT2.objectId)!.should.be.instanceof(FullAccount), (error) => done(error), () => done());
        });

        it("should return accounts by lookup term", (done: (arg?: any) => void) => {
            api.getAllByNames(["decent"])
                .subscribe((value) => value.should.all.be.instanceOf(Account), (error) => done(error), () => done());
        });

        it("should return accounts by name lookup", (done: (arg?: any) => void) => {
            api.listAllRelative("public")
                .subscribe((value) => undefined, (error) => done(error), () => done());
        });

        it("should return accounts by search term", (done: (arg?: any) => void) => {
            api.findAll("public")
                .subscribe((value) => value.should.all.be.instanceOf(Account), (error) => done(error), () => done());
        });

        it("should return account statistics by id", (done: (arg?: any) => void) => {
            api.getStatistics([ChainObject.parse("2.5.35")])
                .subscribe((values) => values.should.include.one.instanceOf(AccountStatistics), (error) => done(error), () => done());
        });

        it("should create a credentials and a transfer op", (done: (arg?: any) => void) => {
            const op = api.createCredentials(Helpers.ACCOUNT_NAME, Helpers.PRIVATE).pipe(flatMap((credentials) =>
                api.createTransfer(credentials, Helpers.ACCOUNT_NAME2, new AssetAmount(1))));

            op.subscribe((value) => value.should.be.instanceOf(TransferOperation), (error) => done(error), () => done());
        });
    });
});
