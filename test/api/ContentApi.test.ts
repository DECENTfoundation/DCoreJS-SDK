import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { AssetAmount, ChainObject, Content, ContentKeys, PurchaseContentOperation, TransferOperation } from "../../src/models";
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

        it.skip("should generate content keys", (done: (arg?: any) => void) => {
            api.generateKeys([ChainObject.parse("1.2.17"), ChainObject.parse("1.2.18")])
                .subscribe((value) => value.should.be.instanceOf(ContentKeys), (error) => done(error), () => done());
        });

        it("should return content by id", (done: (arg?: any) => void) => {
            api.get(ChainObject.parse("2.13.30"))
                .subscribe((value) => value.should.be.instanceOf(Content), (error) => done(error), () => done());
        });

        it("should return content by ids", (done: (arg?: any) => void) => {
            api.getAll([ChainObject.parse("2.13.1"), ChainObject.parse("2.13.2")])
                .subscribe((value) => value.should.all.be.instanceOf(Content), (error) => done(error), () => done());
        });

        it("should return content by URI", (done: (arg?: any) => void) => {
            api.get("ipfs:QmWBoRBYuxzH5a8d3gssRbMS5scs6fqLKgapBfqVNUFUtZ")
                .subscribe((value) => value.should.be.instanceOf(Content), (error) => done(error), () => done());
        });

        it("should list first 100 publishers", (done: (arg?: any) => void) => {
            api.listAllPublishersRelative("")
                .subscribe((value) => value.should.all.be.instanceOf(ChainObject), (error) => done(error), () => done());
        });

        it("should find a content", (done: (arg?: any) => void) => {
            api.findAll("")
                .subscribe((value) => value.should.all.be.instanceOf(Content), (error) => done(error), () => done());
        });

        it("should create transfer operation", (done: (arg?: any) => void) => {
            api.createTransfer(Helpers.CREDENTIALS, ChainObject.parse("2.13.74"), new AssetAmount(1))
                .subscribe((value) => value.should.be.instanceOf(TransferOperation), (error) => done(error), () => done());
        });

        it("should create purchase operation", (done: (arg?: any) => void) => {
            api.createPurchaseOperation(Helpers.CREDENTIALS, ChainObject.parse("2.13.1"))
                .subscribe((value) => value.should.be.instanceOf(PurchaseContentOperation), (error) => done(error), () => done());
        });

    });
});
