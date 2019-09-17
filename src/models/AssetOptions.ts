import { Expose, Transform, Type } from "class-transformer";
import * as Long from "long";
import { DCoreConstants } from "../DCoreConstants";
import { LongToClassSigned, LongToPlain } from "../net/adapter/TypeAdapters";
import { ObjectCheckOf } from "../utils/ObjectCheckOf";
import { assertThrow } from "../utils/Utils";
import { ExchangeRate } from "./ExchangeRate";

interface FixedMaxSupply {
    is_fixed_max_supply: boolean;
}

export class AssetOptions {

    // Int64
    @LongToPlain
    @LongToClassSigned
    @Expose({ name: "max_supply" })
    public maxSupply: Long;

    @Type(() => ExchangeRate)
    @Expose({ name: "core_exchange_rate" })
    public exchangeRate: ExchangeRate;

    @Expose({ name: "is_exchangeable" })
    public exchangeable: boolean;

    // typedef static_variant<void_t, fixed_max_supply_struct>     asset_options_extensions;
    // fixed_max_supply_struct has index 1 therefore we write '1'
    @Transform((values: object[]) => values.map((obj) => [1, obj]), { toPlainOnly: true })
    @Transform((values: Array<[number, object]>) => values.map(([one, obj]) => obj), { toClassOnly: true })
    @Expose({ name: "extensions" })
    public extensions: object[];

    constructor(exchangeRate: ExchangeRate, maxSupply: Long = DCoreConstants.MAX_SHARE_SUPPLY, fixedMaxSupply: boolean = false, exchangeable: boolean = true) {
        assertThrow(maxSupply <= DCoreConstants.MAX_SHARE_SUPPLY, () => "max supply max value overflow");
        this.maxSupply = maxSupply;
        this.exchangeRate = exchangeRate;
        this.exchangeable = exchangeable;
        this.extensions = [{ is_fixed_max_supply: fixedMaxSupply }];
    }

    public get isFixedMaxSupply(): boolean | undefined {
        const fms = this.extensions[0];
        if (ObjectCheckOf<FixedMaxSupply>(fms, "is_fixed_max_supply")) {
            return fms.is_fixed_max_supply;
        } else {
            return;
        }
    }
}
