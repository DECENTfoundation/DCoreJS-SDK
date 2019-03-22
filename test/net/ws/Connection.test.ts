import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import { suite, test, timeout } from "mocha-typescript";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { tap } from "rxjs/operators";
import { GetChainId } from "../../../src/net/models/request/GetChainId";
import { Login } from "../../../src/net/models/request/Login";
import { WebSocketClosedError } from "../../../src/net/models/WebSocketClosedError";
import { RxWebSocket } from "../../../src/net/ws/RxWebSocket";
import { Helpers } from "../../Helpers";

chai.should();
chai.use(chaiThings);

@suite("web socket connections", timeout(20000))
// @ts-ignore
class ConnectionTest {
    public static after() {
        // wtf.dump();
    }

    private rxWs: RxWebSocket;

    private spy: Spy;

    public before() {
        this.spy = create();
        this.spy.log();
        this.rxWs = new RxWebSocket(() => new WebSocket(Helpers.STAGE_WS, { rejectUnauthorized: false }));
    }

    public after() {
        this.rxWs.disconnect();
        this.spy.teardown();
    }

    @test
    public "should connect, disconnect and connect"(done: (arg?: any) => void) {

        this.rxWs.request(new GetChainId()).pipe(tap({ error: (error) => error.should.be.an.instanceof(WebSocketClosedError) }))
            .toPromise().then(null,
            () => this.rxWs.request(new Login())
                .subscribe((value) => value.should.be.true, (error) => done(error), () => done()),
        );
        this.rxWs.disconnect();
    }
}
