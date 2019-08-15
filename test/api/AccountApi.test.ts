import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import * as Long from "long";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { flatMap } from "rxjs/operators";
import { DCoreApi } from "../../src/api/rx/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { AccountStatistics, Authority, ChainObject, FullAccount } from "../../src/models";
import { Account } from "../../src/models/Account";
import { AssetAmount } from "../../src/models/AssetAmount";
import { TransferOperation } from "../../src/models/operation/TransferOperation";
import { Helpers, testCheck } from "../Helpers";

chai.should();
chai.use(chaiThings);

describe("account API test suite for ops", () => {

    let api: DCoreApi;
    let spy: Spy;

    before(() => {
        spy = create();
        // spy.log(/^API\w+/);
        api = DCoreSdk.createApiRx(undefined, () => new WebSocket(Helpers.STAGE_WS), Helpers.LOGGER);
    });

    after(() => {
        api.disconnect();
        spy.teardown();
    });

    it("should create account", (done: (arg?: any) => void) => {
        testCheck(done, api.accountApi.create(Helpers.CREDENTIALS, Helpers.createAccount, Helpers.PUBLIC));
    });

    it("should make a transfer to new account", (done: (arg?: any) => void) => {
        testCheck(done, api.accountApi.transfer(Helpers.CREDENTIALS, Helpers.createAccount, new AssetAmount(10000000)));
    });

    it("should update credentials on a new account", (done: (arg?: any) => void) => {
        testCheck(done, api.accountApi.createCredentials(Helpers.createAccount, Helpers.PRIVATE).pipe(
            flatMap((c) => api.accountApi.update(c, undefined, new Authority(Helpers.PUBLIC2))),
        ));
    });

    it("should make a vote on a new account", (done: (arg?: any) => void) => {
        testCheck(done, api.accountApi.createCredentials(Helpers.createAccount, Helpers.PRIVATE2).pipe(
            flatMap((c) => api.miningApi.vote(c, [ChainObject.parse("1.4.4")])),
        ));
    });

});

Helpers.APIS.forEach(([name, sdk]) => {
    const api = sdk.accountApi;

    describe(`account API test suite for ${name}`, () => {
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
                .subscribe((value) => value.get("1.2.28")!.should.be.instanceof(FullAccount), (error) => done(error), () => done());
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
            api.getStatistics([ChainObject.parse("2.5.12")])
                .subscribe((values) => values.should.include.one.instanceOf(AccountStatistics), (error) => done(error), () => done());
        });

        it("should create a credentials and a transfer op", (done: (arg?: any) => void) => {
            const op = api.createCredentials(Helpers.ACCOUNT_NAME, Helpers.PRIVATE).pipe(flatMap((credentials) =>
                api.createTransfer(credentials, Helpers.ACCOUNT_NAME2, new AssetAmount(1))));

            op.subscribe((value) => value.should.be.instanceOf(TransferOperation), (error) => done(error), () => done());
        });
    });
});
