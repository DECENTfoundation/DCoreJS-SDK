import { Address } from "../src/crypto/Address";
import { Credentials } from "../src/crypto/Credentials";
import { ECKeyPair } from "../src/crypto/ECKeyPair";
import { ChainObject } from "../src/models/ChainObject";

export class Helpers {
    public static readonly DCT_CHAIN_ID_STAGE = "17401602b201b3c45a3ad98afc6fb458f91f519bd30d1058adf6f2bed66376bc";
    public static STAGE_WS = "wss://stagesocket.decentgo.com:8090";
    public static STAGE_HTTPS = "https://stagesocket.decentgo.com:8090/rpc";

    public static readonly ACCOUNT = ChainObject.parse("1.2.34");
    public static readonly ACCOUNT2 = ChainObject.parse("1.2.35");
    public static readonly ACCOUNT_NAME = "u961279ec8b7ae7bd62f304f7c1c3d345";
    public static readonly ACCOUNT_NAME2 = "u3a7b78084e7d3956442d5a4d439dad51";
    public static readonly PRIVATE = "5Jd7zdvxXYNdUfnEXt5XokrE3zwJSs734yQ36a1YaqioRTGGLtn";
    public static readonly PRIVATE2 = "5JVHeRffGsKGyDf7T9i9dBbzVHQrYprYeaBQo2VCSytj7BxpMCq";
    public static readonly PUBLIC = Address.parse("DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz");
    public static readonly PUBLIC2 = Address.parse("DCT6bVmimtYSvWQtwdrkVVQGHkVsTJZVKtBiUqf4YmJnrJPnk89QP");
    public static readonly KEY = ECKeyPair.parseWif(Helpers.PRIVATE);
    public static readonly CREDENTIALS = new Credentials(Helpers.ACCOUNT, Helpers.KEY);

}
