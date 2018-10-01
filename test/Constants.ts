import { Address } from "../src/crypto/Address";
import { ECKeyPair } from "../src/crypto/ECKeyPair";

export class Constants {
    public static readonly DCT_CHAIN_ID_STAGE = "17401602b201b3c45a3ad98afc6fb458f91f519bd30d1058adf6f2bed66376bc";
    public static KEY = ECKeyPair.parseWif("5Jd7zdvxXYNdUfnEXt5XokrE3zwJSs734yQ36a1YaqioRTGGLtn");
    public static PUBKEY = Address.parse("DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz");
    public static STAGE_WS = "wss://stagesocket.decentgo.com:8090";
    public static STAGE_HTTPS = "https://stagesocket.decentgo.com:8090/rpc";
}
