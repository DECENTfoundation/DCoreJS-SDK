import { Address } from "../src/crypto/Address";
import { Credentials } from "../src/crypto/Credentials";
import { ECKeyPair } from "../src/crypto/ECKeyPair";
import { ChainObject } from "../src/models/ChainObject";

export class Helpers {
    public static readonly DCT_CHAIN_ID_STAGE = "17401602b201b3c45a3ad98afc6fb458f91f519bd30d1058adf6f2bed66376bc";
    public static STAGE_WS = "ws://localhost:8090/";
    public static STAGE_HTTPS = "http://localhost:8090/";

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

}
