import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import { suite, test, timeout } from "mocha-typescript";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { flatMap } from "rxjs/operators";
import { Address } from "../../../src/crypto/Address";
import { Account } from "../../../src/models/Account";
import { Asset } from "../../../src/models/Asset";
import { AssetAmount } from "../../../src/models/AssetAmount";
import { ChainObject } from "../../../src/models/ChainObject";
import { Content } from "../../../src/models/Content";
import { DynamicGlobalProperties } from "../../../src/models/DynamicGlobalProperties";
import { ObjectNotFoundError } from "../../../src/models/error/ObjectNotFoundError";
import { Miner } from "../../../src/models/Miner";
import { EmptyOperation } from "../../../src/models/operation/EmptyOperation";
import { OperationType } from "../../../src/models/operation/OperationType";
import { OperationHistory } from "../../../src/models/OperationHistory";
import { ProcessedTransaction } from "../../../src/models/ProcessedTransaction";
import { Purchase } from "../../../src/models/Purchase";
import { ApiGroup } from "../../../src/net/models/ApiGroup";
import { GetAccountBalances } from "../../../src/net/models/request/GetAccountBalances";
import { GetAccountById } from "../../../src/net/models/request/GetAccountById";
import { GetAccountByName } from "../../../src/net/models/request/GetAccountByName";
import { GetAccountHistory } from "../../../src/net/models/request/GetAccountHistory";
import { GetAssets } from "../../../src/net/models/request/GetAssets";
import { GetBuyingByUri } from "../../../src/net/models/request/GetBuyingByUri";
import { GetChainId } from "../../../src/net/models/request/GetChainId";
import { GetContentById } from "../../../src/net/models/request/GetContentById";
import { GetContentByUri } from "../../../src/net/models/request/GetContentByUri";
import { GetDynamicGlobalProps } from "../../../src/net/models/request/GetDynamicGlobalProps";
import { GetKeyReferences } from "../../../src/net/models/request/GetKeyReferences";
import { GetMiners } from "../../../src/net/models/request/GetMiners";
import { GetRecentTransactionById } from "../../../src/net/models/request/GetRecentTransactionById";
import { GetRelativeAccountHistory } from "../../../src/net/models/request/GetRelativeAccountHistory";
import { GetRequiredFees } from "../../../src/net/models/request/GetRequiredFees";
import { GetTransaction } from "../../../src/net/models/request/GetTransaction";
import { Login } from "../../../src/net/models/request/Login";
import { LookupAccounts } from "../../../src/net/models/request/LookupAccounts";
import { LookupAssetSymbols } from "../../../src/net/models/request/LookupAssetSymbols";
import { LookupMinerAccounts } from "../../../src/net/models/request/LookupMinerAccounts";
import { RequestApiAccess } from "../../../src/net/models/request/RequestApiAccess";
import { SearchBuyings } from "../../../src/net/models/request/SearchBuyings";
import { RxWebSocket } from "../../../src/net/ws/RxWebSocket";
import { Helpers } from "../../Helpers";

chai.should();
chai.use(chaiThings);

@suite("web socket requests", timeout(20000))
// @ts-ignore
class WsRequestTest {
    public static after() {
        // wtf.dump();
    }

    private rxWs: RxWebSocket;

    private spy: Spy;

    public before() {
        this.spy = create();
        // this.spy.log(/^RxWebSocket_\w+/);
        this.rxWs = new RxWebSocket(() => new WebSocket(Helpers.STAGE_WS, { rejectUnauthorized: false }));
    }

    public after() {
        this.rxWs.disconnect();
        this.spy.teardown();
    }

    @test
    public "should return asset balances for the account"(done: (arg?: any) => void) {
        this.rxWs.request(new GetAccountBalances(ChainObject.parse("1.2.35")))
            .subscribe((value) => value.should.all.be.instanceOf(AssetAmount), (error) => done(error), () => done());
    }

    @test
    public "should return account by id"(done: (arg?: any) => void) {
        this.rxWs.request(new GetAccountById([ChainObject.parse("1.2.35")]))
            .subscribe((value) => value.should.include.one.instanceOf(Account), (error) => done(error), () => done());
    }

    @test
    public "should return account by name"(done: (arg?: any) => void) {
        this.rxWs.request(new GetAccountByName("u3a7b78084e7d3956442d5a4d439dad51"))
            .subscribe((value) => value.should.be.instanceOf(Account), (error) => done(error), () => done());
    }

    @test
    public "should return account history by name"(done: (arg?: any) => void) {
        this.rxWs.request(new GetAccountHistory(ChainObject.parse("1.2.35"), ChainObject.parse("1.7.35")))
            .subscribe((value) => value.should.all.instanceOf(OperationHistory), (error) => done(error), () => done());
    }

    @test
    public "should return account relative history"(done: (arg?: any) => void) {
        this.rxWs.request(new GetRelativeAccountHistory(ChainObject.parse("1.2.35"), 10, 20))
            .subscribe((value) => value.should.all.instanceOf(OperationHistory), (error) => done(error), () => done());
    }

    @test
    public "should return assets"(done: (arg?: any) => void) {
        this.rxWs.request(new GetAssets([ChainObject.parse("1.3.54")]))
            .subscribe((value) => value.should.include.one.instanceOf(Asset), (error) => done(error), () => done());
    }

    @test
    public "should return purchase by URI"(done: (arg?: any) => void) {
        this.rxWs.request(new GetBuyingByUri(ChainObject.parse("1.2.35"), "http://alax.io/?scheme=alax%3A%2F%2F1%2F1&version=b711dc9b-3627-4f37-93f3-6f6f3137bcca"))
            .subscribe((value) => value.should.be.instanceOf(Purchase), (error) => done(error), () => done());
    }

    @test
    public "should return chain id"(done: (arg?: any) => void) {
        this.rxWs.request(new GetChainId())
            .subscribe((value) => value.should.be.a("string"), (error) => done(error), () => done());
    }

    @test
    public "should return content by id"(done: (arg?: any) => void) {
        this.rxWs.request(new GetContentById(ChainObject.parse("2.13.74")))
            .subscribe((value) => value.should.include.one.instanceOf(Content), (error) => done(error), () => done());
    }

    @test
    public "should return content by URI"(done: (arg?: any) => void) {
        this.rxWs.request(new GetContentByUri("http://alax.io/?scheme=alax%3A%2F%2F1%2F1&version=b711dc9b-3627-4f37-93f3-6f6f3137bcca"))
            .subscribe((value) => value.should.instanceOf(Content), (error) => done(error), () => done());
    }

    @test
    public "should return dynamic global properties"(done: (arg?: any) => void) {
        this.rxWs.request(new GetDynamicGlobalProps())
            .subscribe((value) => value.should.be.instanceOf(DynamicGlobalProperties), (error) => done(error), () => done());
    }

    @test
    public "should return account for key references"(done: (arg?: any) => void) {
        this.rxWs.request(new GetKeyReferences([Address.parse("DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz")]))
            .subscribe((value) => value.should.include.one.include.one.instanceOf(ChainObject), (error) => done(error), () => done());
    }

    @test
    public "should return miner accounts"(done: (arg?: any) => void) {
        this.rxWs.request(new GetMiners([ChainObject.parse("1.4.1")]))
            .subscribe((value) => value.should.include.one.instanceOf(Miner), (error) => done(error), () => done());
    }

    // will not work after `expiration: '2018-07-26T11:27:07'` since the transaction will be removed from recent pool
    @test
    public "should return recent transaction"(done: (arg?: any) => void) {
        this.rxWs.request(new GetRecentTransactionById("95914695085f08b84218e39cdea6f910f380e469"))
        // .subscribe((value) => value.should.be.instanceOf(ProcessedTransaction), (error) => done(error), () => done());
            .subscribe(undefined, (error) => {
                error.should.be.instanceOf(ObjectNotFoundError);
                done();
            }, () => done());
    }

    @test
    public "should return required fees for operation type"(done: (arg?: any) => void) {
        this.rxWs.request(new GetRequiredFees([new EmptyOperation(OperationType.Transfer)]))
            .subscribe((value) => value.should.include.one.instanceOf(AssetAmount), (error) => done(error), () => done());
    }

    @test
    public "should return transaction"(done: (arg?: any) => void) {
        this.rxWs.request(new GetTransaction(1370282, 0))
            .subscribe((value) => value.should.be.instanceOf(ProcessedTransaction), (error) => done(error), () => done());
    }

    @test
    public "should login"(done: (arg?: any) => void) {
        this.rxWs.request(new Login())
            .subscribe((value) => value.should.be.true, (error) => done(error), () => done());
    }

    @test
    public "should return accounts by name lookup"(done: (arg?: any) => void) {
        this.rxWs.request(new LookupAccounts("alx-customer"))
            .subscribe((value) => undefined, (error) => done(error), () => done());
    }

    @test
    public "should return assets by name lookup"(done: (arg?: any) => void) {
        this.rxWs.request(new LookupAssetSymbols(["ALXT", "ALAT"]))
            .subscribe((value) => value.should.all.be.instanceOf(Asset), (error) => done(error), () => done());
    }

    @test
    public "should return miners by name lookup"(done: (arg?: any) => void) {
        this.rxWs.request(new LookupMinerAccounts(""))
            .subscribe((value) => undefined, (error) => done(error), () => done());
    }

    @test
    public "should request api access, has to login before"(done: (arg?: any) => void) {
        this.rxWs.request(new Login()).pipe(flatMap(() =>
            this.rxWs.request(new RequestApiAccess(ApiGroup.Database))))
            .subscribe((value) => value.should.be.a("number"), (error) => done(error), () => done());
    }

    @test
    public "should return purchases by search"(done: (arg?: any) => void) {
        this.rxWs.request(new SearchBuyings(ChainObject.parse("1.2.35"), ""))
            .subscribe((value) => value.should.all.be.instanceOf(Purchase), (error) => done(error), () => done());
    }
}
