import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import { defer } from "rxjs";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { tap } from "rxjs/operators";
import { GetChainId } from "../../../src/net/models/request/GetChainId";
import { Login } from "../../../src/net/models/request/Login";
import { WebSocketClosedError } from "../../../src/net/models/WebSocketClosedError";
import { RxWebSocket, WebSocketContract } from "../../../src/net/ws/RxWebSocket";
import { Helpers } from "../../Helpers";

chai.should();
chai.use(chaiThings);

describe("web socket connections", () => {
    const mockWs: WebSocketContract = {
        onclose: undefined,
        onerror: undefined,
        onmessage: undefined,
        onopen: undefined,
        close(code?: number, data?: string): void {
            return;
        },
        send(data: any): void {
            return;
        },
    };

    let realRxWs: RxWebSocket;
    let mockRxWs: RxWebSocket;

    let spy: Spy;

    before(() => {
        spy = create();
        // spy.log();
        realRxWs = new RxWebSocket(() => new WebSocket(Helpers.STAGE_WS));
        mockRxWs = new RxWebSocket(() => mockWs);
    });

    after(() => {
        realRxWs.disconnect();
        spy.teardown();
    });

    it("should connect, disconnect and connect", (done: (arg?: any) => void) => {
        realRxWs.request(new GetChainId()).pipe(tap({ error: (error) => error.should.be.an.instanceof(WebSocketClosedError) }))
            .toPromise().then(null,
            () => realRxWs.request(new Login())
                .subscribe((value) => value.should.be.true, (error) => done(error), () => done()),
        );
        realRxWs.disconnect();
    });

    it("should connect, handle onclose, clear connection and connect", (done: (arg?: any) => void) => {
        const checkWs = defer(() => mockRxWs.webSocket()).pipe(tap((ws) => ws.should.be.equal(mockWs), (error) => done(error)));
        checkWs.pipe(tap(() => mockWs.onclose({ wasClean: false, reason: "force close mock" })))
            .subscribe({
                complete: () => {
                    checkWs.subscribe({ complete: () => done() });
                    mockWs.onopen();
                },
            });
        mockWs.onopen();
    });
});
