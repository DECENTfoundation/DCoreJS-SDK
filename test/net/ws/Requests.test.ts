import * as chai from "chai";
import * as chaiThings from "chai-things";
import "chai/register-should";
import WebSocket = require("isomorphic-ws");
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import * as wtf from "wtfnode";
import { Account } from "../../../src/models/Account";
import { AssetAmount } from "../../../src/models/AssetAmount";
import { ChainObject } from "../../../src/models/ChainObject";
import { GetAccountBalances } from "../../../src/net/models/request/GetAccountBalances";
import { GetAccountById } from "../../../src/net/models/request/GetAccountById";
import { GetAccountByName } from "../../../src/net/models/request/GetAccountByName";
import { RxWebSocket } from "../../../src/net/ws/RxWebSocket";

chai.should();
chai.use(chaiThings);

describe("websocket requests", function() {
    let rxWs: RxWebSocket;
    let spy: Spy;

    this.timeout(5000);

    beforeEach(() => {
        spy = create();
        spy.log(/^RxWebSocket_make_\w+/);
        rxWs = new RxWebSocket(
            "wss://stagesocket.decentgo.com:8090",
            (url, protocols) => new WebSocket(url, protocols, { rejectUnauthorized: false }),
        );
    });

    afterEach(() => {
        rxWs.close();
        spy.teardown();
    });

    after(() => wtf.dump());

    it("should return asset balances for the account", (done) => {
        rxWs.request(new GetAccountBalances(ChainObject.parse("1.2.35")))
            .subscribe((value) => value.should.all.be.instanceOf(AssetAmount), (error) => done(error), () => done());
    });

    it("should return account by id", (done) => {
        rxWs.request(new GetAccountById(ChainObject.parse("1.2.35")))
            .subscribe((value) => value.should.include.one.instanceOf(Account), (error) => done(error), () => done());
    });

    it("should return account by name", (done) => {
        rxWs.request(new GetAccountByName("u3a7b78084e7d3956442d5a4d439dad51"))
            .subscribe((value) => value.should.include.one.instanceOf(Account), (error) => done(error), () => done());
    });

});
