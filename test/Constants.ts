import { Address } from "../src/crypto/Address";
import { ECKeyPair } from "../src/crypto/ECKeyPair";

export class Constants {
    public static KEY = ECKeyPair.parseWif("5Jd7zdvxXYNdUfnEXt5XokrE3zwJSs734yQ36a1YaqioRTGGLtn");
    public static PUBKEY = Address.parse("DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz");
    public static STAGE_WS = "wss://stagesocket.decentgo.com:8090";
    public static STAGE_HTTPS = "https://stagesocket.decentgo.com:8090/rpc";
}
