import { Address } from "../src/crypto/Address";
import { Credentials } from "../src/crypto/Credentials";
import { ECKeyPair } from "../src/crypto/ECKeyPair";
import { ChainObject } from "../src/models/ChainObject";

export class Helpers {
    // public static readonly DCT_CHAIN_ID_STAGE = "17401602b201b3c45a3ad98afc6fb458f91f519bd30d1058adf6f2bed66376bc";
    // public static STAGE_WS = "wss://testnet-api.dcore.io/";
    // public static STAGE_HTTPS = "https://testnet-api.dcore.io/";

    public static readonly DCT_CHAIN_ID_STAGE = "ea00ad0710dafd0e74a8ff80651f444aa2078d450d24d6b58a634e7ef5dd5128";
    public static STAGE_WS = "ws://192.168.0.225:8090/";
    public static STAGE_HTTPS = "http://192.168.0.225:8090/";

    // public static readonly DCT_CHAIN_ID_STAGE = "4777b283f8006237590c67a5001fb62e14fdfd2c0f5f5afb55e687ae8082d483";
    // public static STAGE_WS = "wss://api.decent.ch/";
    // public static STAGE_HTTPS = "https://api.decent.ch/";

    public static readonly ACCOUNT = ChainObject.parse("1.2.37");
    public static readonly ACCOUNT2 = ChainObject.parse("1.2.38");
    public static readonly ACCOUNT_NAME = "peterv";
    public static readonly ACCOUNT_NAME2 = "peterv2";
    public static readonly PRIVATE = "5KZhaAgHCiQbpkUYRMinCPDvaK2ft9TJ9CVN9FcA3nJfk9Ez6Qk";
    public static readonly PRIVATE2 = "5K8nbuZG9X8EWSyEWWqm3QMogkKfiLqEZ7B2hyo16gdXt78Y2Lu";
    public static readonly PUBLIC = Address.parse("DCT77PBc3B491FnAhSvUTMgrFk9BUJfCfj81UnmJQs1tqFVw4UAag");
    public static readonly PUBLIC2 = Address.parse("DCT7uuRo1BW61ZdsPC3CwTmby6mMkz3VogCb4891vSawTwtWZXLwE");
    public static readonly KEY = ECKeyPair.parseWif(Helpers.PRIVATE);
    public static readonly CREDENTIALS = new Credentials(Helpers.ACCOUNT, Helpers.KEY);

}
