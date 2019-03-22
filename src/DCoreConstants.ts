import * as moment from "moment";
import { ChainObject } from "./models/ChainObject";

export class DCoreConstants {
    public static readonly EXPIRATION_DEFAULT = moment.duration(30, "seconds");
    public static readonly PROXY_TO_SELF_ACCOUNT_ID = ChainObject.parse("1.2.3");
    public static readonly BASIS_POINTS_TOTAL = 10000;
    public static readonly DCT_ASSET_ID = ChainObject.parse("1.3.0");
    public static readonly DCT_ASSET_SYMBOL = "DCT";
}
