import { Expose, Transform, Type } from "class-transformer";
import { AssetOptions } from "./AssetOptions";
import { ChainObject } from "./ChainObject";

export class Asset {

    @Type(() => ChainObject)
    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "symbol" })
    public symbol: string;

    @Expose({ name: "precision" })
    public precision: number;

    @Type(() => ChainObject)
    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "issuer" })
    public issuer: ChainObject;

    @Expose({ name: "description" })
    public description: string;

    @Type(() => AssetOptions)
    @Expose({ name: "options" })
    public options: AssetOptions;

    @Type(() => ChainObject)
    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "dynamic_asset_data_id" })
    public dynamicAssetDataId: ChainObject;

    constructor(id: ChainObject, symbol: string, precision: number, issuer: ChainObject, description: string, options: AssetOptions, dynamicAssetDataId: ChainObject) {
        this.id = id;
        this.symbol = symbol;
        this.precision = precision;
        this.issuer = issuer;
        this.description = description;
        this.options = options;
        this.dynamicAssetDataId = dynamicAssetDataId;
    }
}
