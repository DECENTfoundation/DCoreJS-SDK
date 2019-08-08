import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import * as moment from "moment";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreApi } from "../../src/api/rx/DCoreApi";
import { DCoreClient } from "../../src/DCoreClient";
import { AssetAmount, ChainObject, Content, ContentKeys, PurchaseContentOperation, RegionalPrice, Synopsis, TransferOperation } from "../../src/models";
import { Helpers, testCheck } from "../Helpers";

chai.should();
chai.use(chaiThings);

describe("content API test suite for ops", () => {

    let api: DCoreApi;
    let spy: Spy;

    before(() => {
        spy = create();
        // spy.log(/^API\w+/);
        api = DCoreClient.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS), Helpers.LOGGER);
    });

    after(() => {
        api.disconnect();
        spy.teardown();
    });

    it("should add a content", (done: (arg?: any) => void) => {
        testCheck(done, api.contentApi.add(
            Helpers.CREDENTIALS,
            [[Helpers.ACCOUNT2, 1000]], // 10%
            Helpers.createUri,
            [new RegionalPrice(new AssetAmount(2))],
            moment().add(100, "days"),
            new Synopsis("hello", "world"),
        ));
    });

    it("should add one more content", (done: (arg?: any) => void) => {
        testCheck(done, api.contentApi.add(
            Helpers.CREDENTIALS,
            [],
            `${Helpers.createUri}/other`,
            [new RegionalPrice(new AssetAmount(20))],
            moment().add(10, "days"),
            new Synopsis("hello", "world"),
        ));
    });

    it("should make a transfer to content", (done: (arg?: any) => void) => {
        testCheck(done, api.contentApi.transfer(Helpers.CREDENTIALS, Helpers.createContentId, new AssetAmount(1), "transfer to content"));
    });

    it("should update a content", (done: (arg?: any) => void) => {
        testCheck(done, api.contentApi.update(
            Helpers.CREDENTIALS,
            Helpers.createUri,
            new Synopsis("hello", "update"),
        ));
    });

    it("should make a purchase", (done: (arg?: any) => void) => {
        testCheck(done, api.contentApi.purchase(Helpers.CREDENTIALS, Helpers.createUri));
    });

    it("should rate and comment a purchased content", (done: (arg?: any) => void) => {
        testCheck(done, api.purchaseApi.rateAndComment(
            Helpers.CREDENTIALS,
            Helpers.createUri,
            4,
            "hello comment",
        ));
    });

    it("should remove a content", (done: (arg?: any) => void) => {
        testCheck(done, api.contentApi.remove(Helpers.CREDENTIALS, Helpers.createUri));
    });
});

Helpers.APIS.forEach(([name, sdk]) => {
    const api = sdk.contentApi;

    describe(`content API test suite for ${name}`, () => {
        after(() => {
            // wtf.dump();
        });

        let spy: Spy;

        before(() => {
            spy = create();
            spy.log();
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
            api.get(Helpers.createContentId)
                .subscribe((value) => value.should.be.instanceOf(Content), (error) => done(error), () => done());
        });

        it("should return content by ids", (done: (arg?: any) => void) => {
            api.getAll([Helpers.createContentId, Helpers.createContentId2])
                .subscribe((value) => value.should.all.be.instanceOf(Content), (error) => done(error), () => done());
        });

        it("should return content by URI", (done: (arg?: any) => void) => {
            api.get(Helpers.createUri)
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
            api.createTransfer(Helpers.CREDENTIALS, Helpers.createContentId, new AssetAmount(1))
                .subscribe((value) => value.should.be.instanceOf(TransferOperation), (error) => done(error), () => done());
        });

        it("should create purchase operation", (done: (arg?: any) => void) => {
            api.createPurchaseOperation(Helpers.CREDENTIALS, Helpers.createContentId)
                .subscribe((value) => value.should.be.instanceOf(PurchaseContentOperation), (error) => done(error), () => done());
        });

    });
});
