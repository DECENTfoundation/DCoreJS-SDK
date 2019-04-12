import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import * as _ from "lodash";
import "mocha";
import { duration } from "moment";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreSdk } from "../src/DCoreSdk";
import { AssetAmount } from "../src/models/AssetAmount";
import { ChainObject } from "../src/models/ChainObject";
import { TransferOperation } from "../src/models/operation/TransferOperation";
import { RpcService } from "../src/net/rpc/RpcService";
import { RxWebSocket } from "../src/net/ws/RxWebSocket";
import { Helpers } from "./Helpers";

chai.should();
chai.use(chaiThings);

([
    ["RPC", new DCoreSdk(new RpcService({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false }))],
    ["WebSocket", new DCoreSdk(undefined, new RxWebSocket(() => new WebSocket(Helpers.STAGE_WS)))],
] as Array<[string, DCoreSdk]>).forEach(([name, sdk]) => {
    // const api = new DCoreApi(sdk);

    describe(`dcore SDK test suite for ${name}`, () => {
        after(() => {
            // wtf.dump();
        });

        let spy: Spy;

        before(() => {
            spy = create();
            spy.log(/^API\w+/);
        });

        after(() => {
            sdk.disconnect();
            spy.teardown();
        });

        it("should prepare transaction with multiple ops with different fees", (done: (arg?: any) => void) => {
            const ops = [
                new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(1)),
                new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(2)),
                new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(3)),
                new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(4), undefined, ChainObject.parse("1.3.33")),
                new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(5), undefined, ChainObject.parse("1.3.33")),
                new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(6), undefined, ChainObject.parse("1.3.33")),
            ];

            sdk.prepareTransaction(ops, duration(30, "seconds"))
                .subscribe((value) => value.operations.every((o) => !_.isNil(o.fee)).should.be.true, (error) => done(error), () => done());
        });

    });
});
