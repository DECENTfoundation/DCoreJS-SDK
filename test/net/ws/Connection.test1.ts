import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { tap } from "rxjs/operators";
import { GetChainId } from "../../../src/net/models/request/GetChainId";
import { Login } from "../../../src/net/models/request/Login";
import { WebSocketClosedError } from "../../../src/net/models/WebSocketClosedError";
import { RxWebSocket } from "../../../src/net/ws/RxWebSocket";
import { Helpers } from "../../Helpers1";

chai.should();
chai.use(chaiThings);

describe("web socket connections", () => {
        let rxWs: RxWebSocket;

        let spy: Spy;

        before(() => {
            spy = create();
            spy.log();
            rxWs = new RxWebSocket(() => new WebSocket(Helpers.STAGE_WS, { rejectUnauthorized: false }));
        });

        after(() => {
            rxWs.disconnect();
            spy.teardown();
        });

        it("should connect, disconnect and connect", (done: (arg?: any) => void) => {
            rxWs.request(new GetChainId()).pipe(tap({ error: (error) => error.should.be.an.instanceof(WebSocketClosedError) }))
                .toPromise().then(null,
                () => rxWs.request(new Login())
                    .subscribe((value) => value.should.be.true, (error) => done(error), () => done()),
            );
            rxWs.disconnect();
        });
});
