import * as chai from "chai";
import * as WebSocket from "isomorphic-ws";
import { suite, test, timeout } from "mocha-typescript";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { flatMap, map } from "rxjs/operators";
import { ECKeyPair } from "../../../src/crypto/ECKeyPair";
import { AssetAmount } from "../../../src/models/AssetAmount";
import { BlockData } from "../../../src/models/BlockData";
import { ChainObject } from "../../../src/models/ChainObject";
import { TransferOperation } from "../../../src/models/operation/TransferOperation";
import { Transaction } from "../../../src/models/Transaction";
import { TransactionConfirmation } from "../../../src/models/TransactionConfirmation";
import { BroadcastTransactionWithCallback } from "../../../src/net/models/request/BroadcastTransactionWithCallback";
import { GetDynamicGlobalProps } from "../../../src/net/models/request/GetDynamicGlobalProps";
import { RxWebSocket } from "../../../src/net/ws/RxWebSocket";

chai.should();

@suite("blockchain based operations", timeout(20000))
// @ts-ignore
class OperationsTest {
    public static after() {
        // wtf.dump();
    }

    private static KEY = ECKeyPair.parseWif("5Jd7zdvxXYNdUfnEXt5XokrE3zwJSs734yQ36a1YaqioRTGGLtn");
    private rxWs: RxWebSocket;

    private spy: Spy;

    public before() {
        this.spy = create();
        // this.spy.log(/^RxWebSocket_\w+/);
        this.rxWs = new RxWebSocket(() => new WebSocket("wss://stagesocket.decentgo.com:8090", { rejectUnauthorized: false }));
    }

    public after() {
        this.rxWs.close();
        this.spy.teardown();
    }

    @test
    public "should make a transfer"(done: (arg?: any) => void) {
        const op = new TransferOperation(
            ChainObject.parse("1.2.34"),
            ChainObject.parse("1.2.35"),
            new AssetAmount(1),
            // new Memo("hello world"),
            null,
            new AssetAmount(500000),
        );

        this.rxWs.request(new GetDynamicGlobalProps())
            .pipe(
                map((props) => new Transaction(new BlockData(props), [op])),
                map((trx) => trx.sign(OperationsTest.KEY)),
                flatMap((trx) => this.rxWs.request(new BroadcastTransactionWithCallback(trx, 123))),
            )
            .subscribe((value) => value.should.be.instanceOf(TransactionConfirmation), (error) => done(error), () => done());

    }
}
