import { ChainObject } from "./models/ChainObject";

export class DCoreSdk {

    public static DCT_CHAIN_ID = "17401602b201b3c45a3ad98afc6fb458f91f519bd30d1058adf6f2bed66376bc";
    public static DCT_ASSET_ID = ChainObject.parse("1.3.0");
    public static PROXY_TO_SELF_ACCOUNT_ID = ChainObject.parse("1.2.3");
/*
    public static DCT = new Asset(
        DCoreSdk.DCT_ASSET_ID,
        "DCT",
        8,
        ChainObject.parse("1.2.1"),
        "",
        new AssetOptions(7319777577456900, new ExchangeRate(), true),
        ChainObject.parse("2.3.0"),
    );
*/

}
