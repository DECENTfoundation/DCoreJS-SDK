import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { flatMap, map, tap } from "rxjs/operators";
import { Credentials } from "../../src/crypto/Credentials";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { ChainObject } from "../../src/models/ChainObject";
import { DCoreError } from "../../src/models/error/DCoreError";
import { ObjectNotFoundError } from "../../src/models/error/ObjectNotFoundError";
import { Nft } from "../../src/models/Nft";
import { NftData } from "../../src/models/NftData";
import { Helpers, testCheck, testCheckWith } from "../Helpers";
import { NftApple } from "../model/NftApple";
import { NftNotApple } from "../model/NftNotApple";

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

    it("should create nft nested definition", (done: (arg?: any) => void) => {
        testCheck(done, api.nftApi.create(
            Helpers.CREDENTIALS,
            Helpers.createNftNested,
            100,
            false,
            "an apple",
            NftApple.DEFINITION,
            true,
        ));
    });

    it("should create some other nft definition", (done: (arg?: any) => void) => {
        testCheck(done, api.nftApi.create(
            Helpers.CREDENTIALS,
            Helpers.createNft2,
            100,
            false,
            "not an apple",
            NftNotApple.DEFINITION,
            true,
        ));
    });

    it("should update nft definition", (done: (arg?: any) => void) => {
        testCheck(done, api.nftApi.update(
            Helpers.CREDENTIALS,
            Helpers.createNft,
            undefined,
            undefined,
            "an apple updated",
        ));
    });

    it("should issue nft", (done: (arg?: any) => void) => {
        testCheck(done, api.nftApi.issue(
            Helpers.CREDENTIALS,
            Helpers.createNft,
            Helpers.ACCOUNT,
            new NftApple(5, "red", false).values,
        ));
    });

    it("should fail issue same nft again", (done: (arg?: any) => void) => {
        testCheckWith(api.nftApi.issue(
            Helpers.CREDENTIALS,
            Helpers.createNft,
            Helpers.ACCOUNT,
            new NftApple(5, "red", false).values,
        ), {
            error: (e) => {
                e.should.be.instanceOf(DCoreError);
                done();
            }
        });
    });

    it("should issue same nft other data", (done: (arg?: any) => void) => {
        testCheck(done, api.nftApi.issue(
            Helpers.CREDENTIALS,
            Helpers.createNft,
            Helpers.ACCOUNT,
            new NftApple(5, "green", false).values,
        ));
    });

    it("should issue some other nft", (done: (arg?: any) => void) => {
        testCheck(done, api.nftApi.issue(
            Helpers.CREDENTIALS,
            Helpers.createNft2,
            Helpers.ACCOUNT,
            new NftNotApple(true, -1, "this is not an apple").values,
        ));
    });

    it("should transfer nft", (done: (arg?: any) => void) => {
        testCheck(done, api.nftApi.transfer(
            Helpers.CREDENTIALS,
            Helpers.ACCOUNT2,
            ChainObject.parse("1.11.2"),
        ));
    });

    it("should update transferred nft by issuer", (done: (arg?: any) => void) => {
        testCheck(done, api.nftApi.getDataRaw(ChainObject.parse("1.11.2")).pipe(
            map((it) => [it, NftNotApple.create(it.data)] as [NftData, NftApple]),
            tap(([nft, data]) => data.eaten = !data.eaten),
            map(([nft, data]) => [nft.id, Nft.createUpdate(NftNotApple.DEFINITION, data.values)] as [ChainObject, Map<string, any>]),
            flatMap(([nft, data]) => api.nftApi.updateData(Helpers.CREDENTIALS, nft, data),
            ),
        ));
    });

    it("should update transferred nft by owner", (done: (arg?: any) => void) => {
        testCheck(done, api.nftApi.getDataRaw(ChainObject.parse("1.11.2")).pipe(
            map((it) => [it, NftNotApple.create(it.data)] as [NftData, NftApple]),
            tap(([nft, data]) => data.eaten = !data.eaten),
            map(([nft, data]) => [nft.id, Nft.createUpdate(NftNotApple.DEFINITION, data.values)] as [ChainObject, Map<string, any>]),
            flatMap(([nft, data]) => api.nftApi.updateData(new Credentials(Helpers.ACCOUNT2, Helpers.PRIVATE2), nft, data),
            ),
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

        it("should get NFT by symbol or id", (done: (arg?: any) => void) => {
            testCheck(done, api.get(Helpers.createNft));
        });

        it("should get NFT by id", (done: (arg?: any) => void) => {
            testCheck(done, api.get(ChainObject.parse("1.10.0")));
        });

        it("should fail get NFT by id", (done: (arg?: any) => void) => {
            testCheckWith(api.get(ChainObject.parse("1.10.10000")), {
                error: (e) => {
                    e.should.be.instanceOf(ObjectNotFoundError);
                    done();
                },
            });
        });

        it("should get NFTs by id", (done: (arg?: any) => void) => {
            testCheck(done, api.getAll([ChainObject.parse("1.10.0"), ChainObject.parse("1.10.1")]));
        });

        it("should get NFT by symbol", (done: (arg?: any) => void) => {
            testCheck(done, api.get(Helpers.createNft));
        });

        it("should get NFTs by symbol", (done: (arg?: any) => void) => {
            testCheck(done, api.getAllBySymbol([Helpers.createNft, Helpers.createNftNested]));
        });

        it("should get NFTs data by id raw", (done: (arg?: any) => void) => {
            testCheck(done, api.getAllDataRaw([ChainObject.parse("1.11.0"), ChainObject.parse("1.11.1")]));
        });

        it("should get NFT data by id raw", (done: (arg?: any) => void) => {
            testCheck(done, api.getDataRaw(ChainObject.parse("1.11.0")));
        });

        it("should get count of NFTs", (done: (arg?: any) => void) => {
            testCheckWith(api.countAll(), {
                next: (v) => {
                    v.should.be.eq(3);
                    done();
                },
            });
        });

        it("should get count of NFTs data", (done: (arg?: any) => void) => {
            testCheckWith(api.countAllData(), {
                next: (v) => {
                    v.should.be.eq(3);
                    done();
                },
            });
        });

        it("should get NFT balances raw", (done: (arg?: any) => void) => {
            testCheck(done, api.getNftBalancesRaw(Helpers.ACCOUNT));
        });

        it("should list all NFTs", (done: (arg?: any) => void) => {
            testCheck(done, api.listAllRelative());
        });

        it("should get data for NFT raw", (done: (arg?: any) => void) => {
            testCheck(done, api.listDataByNftRaw(ChainObject.parse("1.10.0")));
        });

    });
});
