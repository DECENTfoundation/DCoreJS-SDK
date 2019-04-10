import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import * as Long from "long";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { AccountUpdateOperation, ChainObject, Miner, MinerId, MinerVotes, MinerVotingInfo, VoteId } from "../../src/models";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
    const api = sdk.miningApi;

    describe(`mining API test suite for ${name}`, () => {
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

        it("should return current votes", (done: (arg?: any) => void) => {
            api.getActualVotes()
                .subscribe((value) => value.should.all.be.instanceOf(MinerVotes), (error) => done(error), () => done());
        });

        it("should return reward for block", (done: (arg?: any) => void) => {
            api.getAssetPerBlock(Long.fromNumber(1))
                .subscribe((value) => value.should.be.instanceOf(Long), (error) => done(error), () => done());
        });

        it("should return feeds by miner", (done: (arg?: any) => void) => {
            api.getFeedsByMiner(ChainObject.parse("1.2.4"))
                .subscribe((value) => undefined, (error) => done(error), () => done());
        });

        it("should return miner for account", (done: (arg?: any) => void) => {
            api.getMinerByAccount(ChainObject.parse("1.2.4"))
                .subscribe((value) => value.should.be.instanceOf(Miner), (error) => done(error), () => done());
        });

        it("should return miner count", (done: (arg?: any) => void) => {
            api.getMinerCount()
                .subscribe((value) => value.should.be.instanceOf(Long), (error) => done(error), () => done());
        });

        it("should return miner accounts", (done: (arg?: any) => void) => {
            api.getMiners([ChainObject.parse("1.4.1")])
                .subscribe((value) => value.should.include.one.instanceOf(Miner), (error) => done(error), () => done());
        });

        it("should return miner accounts to name", (done: (arg?: any) => void) => {
            api.getMinersToName()
                .subscribe((value) => value.get("init0")!.should.be.instanceOf(Miner), (error) => done(error), () => done());
        });

        it("should return new reward for block", (done: (arg?: any) => void) => {
            api.getNewAssetPerBlock()
                .subscribe((value) => value.should.be.instanceOf(Long), (error) => done(error), () => done());
        });

        it("should return miners by name lookup", (done: (arg?: any) => void) => {
            api.listMinersRelative("")
                .subscribe((value) => value.should.all.be.instanceOf(MinerId), (error) => done(error), () => done());
        });

        it("should return miners by vote id", (done: (arg?: any) => void) => {
            api.findVotedMiners([VoteId.parse("0:1")])
                .subscribe((value) => value.should.all.be.instanceOf(Miner), (error) => done(error), () => done());
        });

        it("should find miner voting info", (done: (arg?: any) => void) => {
            api.findAllVotingInfo("")
                .subscribe((value) => value.should.all.be.instanceOf(MinerVotingInfo), (error) => done(error), () => done());
        });

        it("should create vote operation", (done: (arg?: any) => void) => {
            api.createVoteOperation(Helpers.ACCOUNT.objectId, [ChainObject.parse("1.4.1")])
                .subscribe((value) => value.should.be.instanceOf(AccountUpdateOperation), (error) => done(error), () => done());
        });

    });
});
