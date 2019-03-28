import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { ElGamal } from "../../src/crypto/ElGamal";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { AssetAmount, ChainObject, Content, ContentKeys, PubKey, PurchaseContentOperation, TransferOperation } from "../../src/models";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
    const api = sdk.contentApi;

    describe(`content API test suite for ${name}`, () => {
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

        // todo generateKeys, no seeders

        it("should generate content keys", (done: (arg?: any) => void) => {
            api.generateKeys([ChainObject.parse("1.2.16")])
                .subscribe((value) => value.should.be.instanceOf(ContentKeys), (error) => done(error), () => done());
        });

        it("should return content by id", (done: (arg?: any) => void) => {
            api.get(ChainObject.parse("2.13.74"))
                .subscribe((value) => value.should.be.instanceOf(Content), (error) => done(error), () => done());
        });

        it("should return content by URI", (done: (arg?: any) => void) => {
            api.get("http://alax.io/?scheme=alax%3A%2F%2F1%2F1&version=b711dc9b-3627-4f37-93f3-6f6f3137bcca")
                .subscribe((value) => value.should.be.instanceOf(Content), (error) => done(error), () => done());
        });

        it("should list first 100 publishers", (done: (arg?: any) => void) => {
            api.listAllPublishersRelative("")
                .subscribe((value) => value.should.all.be.instanceOf(ChainObject), (error) => done(error), () => done());
        });

        it("should restore enc keys", (done: (arg?: any) => void) => {
            api.restoreEncryptionKey(new PubKey(ElGamal.createPrivate(Helpers.KEY).toString()), ChainObject.parse("2.12.3"))
                .subscribe((value) => value.should.be.a("string"), (error) => done(error), () => done());
        });

        // todo restoreEncryption key, no valid purchase

        it("should find a content", (done: (arg?: any) => void) => {
            api.findAll("")
                .subscribe((value) => value.should.all.be.instanceOf(Content), (error) => done(error), () => done());
        });

        it("should create purchase operation", (done: (arg?: any) => void) => {
            api.createPurchaseOperation(Helpers.CREDENTIALS, ChainObject.parse("2.13.74"))
                .subscribe((value) => value.should.be.instanceOf(PurchaseContentOperation), (error) => done(error), () => done());
        });

        it("should create transfer operation", (done: (arg?: any) => void) => {
            api.createTransfer(Helpers.CREDENTIALS, ChainObject.parse("2.13.74"), new AssetAmount(1))
                .subscribe((value) => value.should.be.instanceOf(TransferOperation), (error) => done(error), () => done());
        });

    });
});
