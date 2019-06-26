import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { Helpers, testCheck, testCheckWith } from "../Helpers";
import { NftApple } from "../model/NftApple";

chai.should();
chai.use(chaiThings);

describe("NFT API test suite for ops", () => {

    let api: DCoreApi;
    let spy: Spy;

    before(() => {
        spy = create();
        // spy.log(/^API\w+/);
        api = DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS));
    });

    after(() => {
        api.disconnect();
        spy.teardown();
    });

    it("should create nft definition", (done: (arg?: any) => void) => {
        testCheck(done, api.nftApi.create(
            Helpers.CREDENTIALS,
            Helpers.createNft,
            100,
            false,
            "an apple",
            NftApple.DEFINITION,
            true,
        ));
    });

});

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
    const api = sdk.nftApi;

    describe(`NFT API test suite for ${name}`, () => {
        let spy: Spy;

        before(() => {
            spy = create();
            // spy.log(/^API\w+/);
        });

        after(() => {
            sdk.disconnect();
            spy.teardown();
        });

        it("should return count of nfts", (done: (arg?: any) => void) => {
            testCheckWith(api.countAll(), {
                next: (it) => {
                    it.should.be.equal(1);
                    done();
                },
            });
        });

    });
});
