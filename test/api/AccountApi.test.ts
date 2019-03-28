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
// tslint:disable-next-line:max-line-length
import { ApiAccessError, Asset, ChainObject, Content, DynamicGlobalProperties, FullAccount, Miner, ObjectNotFoundError, OperationHistory, ProcessedTransaction, Purchase } from "../../src/models";
import { Account } from "../../src/models/Account";
import { AssetAmount } from "../../src/models/AssetAmount";
import { AssetData } from "../../src/models/AssetData";
import { TransferOperation } from "../../src/models/operation/TransferOperation";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
] as Array<[string, DCoreApi]>).forEach(([name, api]) => {

    describe(`account API test suite for ${name}`, () => {
        after(() => {
            // wtf.dump();
        });

        let spy: Spy;

        before(() => {
            spy = create();
            // this.spy.log(/^API\w+/);
        });

        after(() => {
            api.disconnect();
            spy.teardown();
        });

        it("should create a transfer", (done: (arg?: any) => void) => {
            const op = api.accountApi.createCredentials(Helpers.ACCOUNT_NAME, Helpers.PRIVATE).pipe(flatMap((credentials) =>
                api.accountApi.createTransfer(credentials, Helpers.ACCOUNT_NAME2, new AssetAmount(1))));

            op.subscribe((value) => value.should.be.instanceOf(TransferOperation), (error) => done(error), () => done());
        });

        it("should return asset balances for the account", (done: (arg?: any) => void) => {
            api.balanceApi.getAll("1.2.35")
                .subscribe((value) => value.should.all.be.instanceOf(AssetAmount), (error) => done(error), () => done());
        });

        it("should return account by id", (done: (arg?: any) => void) => {
            api.accountApi.getAll([ChainObject.parse("1.2.35")])
                .subscribe((value) => value.should.include.one.instanceOf(Account), (error) => done(error), () => done());
        });

        // GetStatisticsById missing
        // it("should return account statistics by id", (done: (arg?: any) => void) => {
        //     rpc.request(new GetStatisticsById(ChainObject.parse("2.5.35")))
        //         .subscribe((value) => value.should.include.one.instanceOf(AccountStatistics), (error) => done(error), () => done());
        // });

        it("should return account by name", (done: (arg?: any) => void) => {
            api.accountApi.getByName("u3a7b78084e7d3956442d5a4d439dad51")
                .subscribe((value) => value.should.be.instanceOf(Account), (error) => done(error), () => done());
        });

        it("should return account history by name", (done: (arg?: any) => void) => {
            api.historyApi.listOperations(ChainObject.parse("1.2.35"), ChainObject.parse("1.7.35"))
                .subscribe(undefined, (error) => {
                    error.should.be.instanceOf(ApiAccessError);
                    done();
                }, () => done());
        });

        it("should return account relative history", (done: (arg?: any) => void) => {
            api.historyApi.listOperationsRelative(ChainObject.parse("1.2.35"), 10, 20)
                .subscribe(undefined, (error) => {
                    error.should.be.instanceOf(ApiAccessError);
                    done();
                }, () => done());
        });

        it("should return assets", (done: (arg?: any) => void) => {
            api.assetApi.getAll([ChainObject.parse("1.3.54")])
                .subscribe((value) => value.should.include.one.instanceOf(Asset), (error) => done(error), () => done());
        });

        it("should return purchase by URI", (done: (arg?: any) => void) => {
            api.purchaseApi.get(ChainObject.parse("1.2.35"), "http://alax.io/?scheme=alax%3A%2F%2F1%2F1&version=b711dc9b-3627-4f37-93f3-6f6f3137bcca")
                .subscribe((value) => value.should.be.instanceOf(Purchase), (error) => done(error), () => done());
        });

        it("should return chain id", (done: (arg?: any) => void) => {
            api.generalApi.getChainId()
                .subscribe((value) => value.should.be.a("string"), (error) => done(error), () => done());
        });

        it("should return content by id", (done: (arg?: any) => void) => {
            api.contentApi.get(ChainObject.parse("2.13.74"))
                .subscribe((value) => value.should.include.one.instanceOf(Content), (error) => done(error), () => done());
        });

        it("should return content by URI", (done: (arg?: any) => void) => {
            api.contentApi.get("http://alax.io/?scheme=alax%3A%2F%2F1%2F1&version=b711dc9b-3627-4f37-93f3-6f6f3137bcca")
                .subscribe((value) => value.should.instanceOf(Content), (error) => done(error), () => done());
        });

        it("should return dynamic global properties", (done: (arg?: any) => void) => {
            api.generalApi.getDynamicGlobalProperties()
                .subscribe((value) => value.should.be.instanceOf(DynamicGlobalProperties), (error) => done(error), () => done());
        });

        it("should return account for key references", (done: (arg?: any) => void) => {
            api.accountApi.findAllReferencesByKeys([Address.parse("DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz")])
                .subscribe((value) => value.should.include.one.include.one.instanceOf(ChainObject), (error) => done(error), () => done());
        });

        it("should return miner accounts", (done: (arg?: any) => void) => {
            api.miningApi.getMiners([ChainObject.parse("1.4.1")])
                .subscribe((value) => value.should.include.one.instanceOf(Miner), (error) => done(error), () => done());
        });

        // will not work after `expiration: '2018-07-26T11:27:07'` since the transaction will be removed from recent poo
        it("should return recent transaction", (done: (arg?: any) => void) => {
            api.transactionApi.getRecent("95914695085f08b84218e39cdea6f910f380e469")
            // .subscribe((value) => value.should.be.instanceOf(ProcessedTransaction), (error) => done(error), () => done());
                .subscribe(undefined, (error) => {
                    error.should.be.instanceOf(ObjectNotFoundError);
                    done();
                }, () => done());
        });

        // cannot find validation api
        // it("should return required fees for operation type", (done: (arg?: any) => void) => {
        //     rpc.request(new GetRequiredFees([new EmptyOperation(OperationType.Transfer)]))
        //         .subscribe((value) => value.should.include.one.instanceOf(AssetAmount), (error) => done(error), () => done());
        // });

        it("should return transaction", (done: (arg?: any) => void) => {
            api.transactionApi.get(1370282, 0)
                .subscribe((value) => value.should.be.instanceOf(ProcessedTransaction), (error) => done(error), () => done());
        });

        // cannot find api group for login
        // it("should login", (done: (arg?: any) => void) => {
        //     api.l())
        //         .subscribe(undefined, (error) => {
        //             error.should.be.instanceOf(ApiAccessError);
        //             done();
        //         }, () => done());
        // });

        it("should return accounts by name lookup", (done: (arg?: any) => void) => {
            api.accountApi.listAllRelative("alx-customer")
                .subscribe((value) => undefined, (error) => done(error), () => done());
        });

        it("should return assets by name lookup", (done: (arg?: any) => void) => {
            api.assetApi.getAllByName(["ALXT", "ALAT"])
                .subscribe((value) => value.should.all.be.instanceOf(Asset), (error) => done(error), () => done());
        });

        it("should return miners by name lookup", (done: (arg?: any) => void) => {
            api.miningApi.listMinersRelative("")
                .subscribe((value) => undefined, (error) => done(error), () => done());
        });

        it("should return account history", (done: (arg?: any) => void) => {
            api.historyApi.listOperations(ChainObject.parse("1.2.35"))
                .subscribe((value) => value.should.all.be.instanceOf(OperationHistory), (error) => done(error), () => done());
        });

        it("should return purchases by search", (done: (arg?: any) => void) => {
            api.purchaseApi.findAll(ChainObject.parse("1.2.35"), "")
                .subscribe((value) => value.should.all.be.instanceOf(Purchase), (error) => done(error), () => done());
        });

        it("should return asset data", (done: (arg?: any) => void) => {
            api.assetApi.getAssetsData([ChainObject.parse("2.3.0")])
                .subscribe((value) => value.should.all.be.instanceOf(AssetData), (error) => done(error), () => done());
        });

        it("should return full account by id", (done: (arg?: any) => void) => {
            api.accountApi.getFullAccounts(["1.2.35"], false)
                .subscribe((value) => value.get("1.2.35")!.should.be.instanceof(FullAccount), (error) => done(error), () => done());
        });

        it("should return accounts by search term", (done: (arg?: any) => void) => {
            api.accountApi.findAll("alax")
                .subscribe((value) => value.should.all.be.instanceOf(Account), (error) => done(error), () => done());
        });

        it("should return accounts by lookup term", (done: (arg?: any) => void) => {
            api.accountApi.getAllByNames(["decent"])
                .subscribe((value) => value.should.all.be.instanceOf(Account), (error) => done(error), () => done());
        });
    });
});
