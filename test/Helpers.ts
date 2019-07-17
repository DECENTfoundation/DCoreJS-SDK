import * as WebSocket from "isomorphic-ws";
import * as P from "pino";
import { Observable, PartialObserver } from "rxjs";
import { Address } from "../src/crypto/Address";
import { Credentials } from "../src/crypto/Credentials";
import { ECKeyPair } from "../src/crypto/ECKeyPair";
import { DCoreApi } from "../src/DCoreApi";
import { DCoreSdk } from "../src/DCoreSdk";
import { ChainObject } from "../src/models/ChainObject";

export class Helpers {
    public static readonly DCT_CHAIN_ID_STAGE = "17401602b201b3c45a3ad98afc6fb458f91f519bd30d1058adf6f2bed66376bc";
    public static STAGE_WS = "ws://localhost:8090/";
    public static STAGE_HTTPS = "http://localhost:8090/";
    public static LOGGER = P({ name: "TEST", base: undefined, prettyPrint: true, level: "debug" });

    public static APIS = [
        ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false }, Helpers.LOGGER)],
        ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS), Helpers.LOGGER)],
    ] as Array<[string, DCoreApi]>;

    public static readonly ACCOUNT = ChainObject.parse("1.2.27");
    public static readonly ACCOUNT2 = ChainObject.parse("1.2.28");
    public static readonly ACCOUNT_NAME = "public-account-9";
    public static readonly ACCOUNT_NAME2 = "public-account-10";
    public static readonly PRIVATE = "5JuJbrKZgAATcouJnwpaxPbHMAMDXSgUpQSfxTXzkSUufcnpTUa";
    public static readonly PRIVATE2 = "5JuJbrKZgAATcouJnwpaxPbHMAMDXSgUpQSfxTXzkSUufcnpTUa";
    public static readonly PUBLIC = Address.parse("DCT82MTCQVa9TDFmz3ZwaLzsFAmCLoJzrtFugpF72vsbuE1CpCwKy");
    public static readonly PUBLIC2 = Address.parse("DCT82MTCQVa9TDFmz3ZwaLzsFAmCLoJzrtFugpF72vsbuE1CpCwKy");
    public static readonly KEY = ECKeyPair.parseWif(Helpers.PRIVATE);
    public static readonly CREDENTIALS = new Credentials(Helpers.ACCOUNT, Helpers.KEY);

    public static readonly createAccount = "account-test";
    public static readonly createAsset = "TEST";
    public static readonly createAssetId = ChainObject.parse("1.3.33");
    public static readonly createUri = "http://hello.world.io";
    public static readonly createContentId = ChainObject.parse("2.13.0");
    public static readonly createContentId2 = ChainObject.parse("2.13.1");
    public static readonly createPurchaseId = ChainObject.parse("2.12.0");
    public static readonly createNft = "APPLE";
    public static readonly createNft2 = "NOTAPPLE";
    public static readonly createNftNested = `${Helpers.createNft}.NESTED`;

}

export function testCheck<T>(done: (arg?: any) => void, stream: Observable<T>) {
    stream.subscribe({ error: (err) => done(err), complete: () => done() });
}

export function testCheckWith<T>(stream: Observable<T>, check: PartialObserver<T>) {
    stream.subscribe(check);
}
