import { Expose, Type } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { assertThrow } from "../../utils/Utils";
import { Asset } from "../Asset";
import { AssetAmount } from "../AssetAmount";
import { AssetOptions } from "../AssetOptions";
import { ChainObject } from "../ChainObject";
import { MonitoredAssetOpts } from "../MonitoredAssetOpts";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class AssetCreateOperation extends BaseOperation {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "issuer" })
    public issuer: ChainObject;

    @Expose({ name: "symbol" })
    public symbol: string;

    @Expose({ name: "precision" })
    public precision: number;

    @Expose({ name: "description" })
    public description: string;

    @Type(() => AssetOptions)
    @Expose({ name: "options" })
    public options: AssetOptions;

    @Type(() => MonitoredAssetOpts)
    @Expose({ name: "monitored_asset_opts" })
    public monitoredOptions?: MonitoredAssetOpts;

    constructor(
        issuer: ChainObject,
        symbol: string,
        precision: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
        description: string,
        options: AssetOptions,
        monitoredOptions?: MonitoredAssetOpts,
        fee?: AssetAmount | ChainObject,
    ) {
        super(OperationType.AssetCreate, fee);
        this.issuer = issuer;
        this.symbol = symbol;
        this.precision = precision;
        this.description = description;
        this.options = options;
        this.monitoredOptions = monitoredOptions;

        // plainToClass ctor passes undefined args so just skip
        assertThrow(symbol ? Asset.isValidSymbol(symbol) : true, () => "invalid asset symbol: " + symbol);
        assertThrow(description ? description.length <= 1000 : true, () => "description cannot be longer then 1000 chars");
    }

}
