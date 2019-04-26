import { Expose, Type } from "class-transformer";
import { AssetPrecision, Fee } from "../../DCoreSdk";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { assertThrow } from "../../utils/Utils";
import { Asset } from "../Asset";
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

    /**
     * Create Asset operation constructor.
     *
     * @param issuer account id issuing the asset
     * @param symbol the string symbol, 3-16 uppercase chars
     * @param precision base unit precision, todo reference to AssetFormatter once done describing the 'raw' value
     * @param description optional description
     * @param options asset options
     * @param monitoredOptions options for monitored asset
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    constructor(
        issuer: ChainObject,
        symbol: string,
        precision: AssetPrecision,
        description: string,
        options: AssetOptions,
        monitoredOptions?: MonitoredAssetOpts,
        fee?: Fee,
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
