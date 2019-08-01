import * as chai from "chai";
import * as chaiThings from "chai-things";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { ElGamal } from "../../src/crypto/ElGamal";
import { PubKey, Purchase } from "../../src/models";
import { LeaveRatingAndCommentOperation } from "../../src/models/operation/LeaveRatingAndCommentOperation";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

Helpers.APIS.forEach(([name, sdk]) => {
    const api = sdk.purchaseApi;

    describe(`purchase API test suite for ${name}`, () => {
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

        it("should return all purchase history", (done: (arg?: any) => void) => {
            api.getAllHistory(Helpers.ACCOUNT)
                .subscribe((value) => value.should.all.be.instanceOf(Purchase), (error) => done(error), () => done());
        });

        it("should return all open purchases", (done: (arg?: any) => void) => {
            api.getAllOpen()
                .subscribe((value) => value.should.all.be.instanceOf(Purchase), (error) => done(error), () => done());
        });

        it("should return all open purchases by uri", (done: (arg?: any) => void) => {
            api.getAllOpenByUri(Helpers.createUri)
                .subscribe((value) => value.should.all.be.instanceOf(Purchase), (error) => done(error), () => done());
        });

        it("should return all open purchases by account", (done: (arg?: any) => void) => {
            api.getAllOpenByAccount(Helpers.ACCOUNT)
                .subscribe((value) => value.should.all.be.instanceOf(Purchase), (error) => done(error), () => done());
        });

        it("should return purchase by URI", (done: (arg?: any) => void) => {
            api.get(Helpers.ACCOUNT, Helpers.createUri)
                .subscribe((value) => value.should.be.instanceOf(Purchase), (error) => done(error), () => done());
        });

        it("should return purchases by search", (done: (arg?: any) => void) => {
            api.findAll(Helpers.ACCOUNT, "")
                .subscribe((value) => value.should.all.be.instanceOf(Purchase), (error) => done(error), () => done());
        });

        it("should find purchases feedback", (done: (arg?: any) => void) => {
            api.findAllForFeedback(Helpers.createUri)
                .subscribe((value) => value.should.all.be.instanceOf(Purchase), (error) => done(error), () => done());
        });

        it("should restore enc keys", (done: (arg?: any) => void) => {
            api.restoreEncryptionKey(new PubKey(ElGamal.createPrivate(Helpers.KEY).toString()), Helpers.createPurchaseId)
                .subscribe((value) => value.should.be.a("string"), (error) => done(error), () => done());
        });

        it("should create rate and comment operation", (done: (arg?: any) => void) => {
            api.createRateAndCommentOperation(Helpers.createUri, Helpers.ACCOUNT, 1, "comment")
                .subscribe((value) => value.should.be.instanceOf(LeaveRatingAndCommentOperation), (error) => done(error), () => done());
        });

    });
});
