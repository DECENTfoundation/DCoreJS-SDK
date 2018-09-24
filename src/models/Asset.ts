import { Expose, Transform, Type } from "class-transformer";
import { AssetOptions } from "./AssetOptions";
import { ChainObject } from "./ChainObject";

export class Asset {

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "symbol" })
    public symbol: string;

    @Expose({ name: "precision" })
    public precision: number;

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "issuer" })
    public issuer: ChainObject;

    @Expose({ name: "description" })
    public description: string;

    @Type(() => AssetOptions)
    @Expose({ name: "options" })
    public options: AssetOptions;

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "dynamic_asset_data_id" })
    public dynamicAssetDataId: ChainObject;

    // create DCT
    /*
        constructor(id: ChainObject) {
            this.id = id;
            this.symbol = "DCT";
            this.precision = 8;
            this.issuer = ChainObject.parse("1.2.1");
            this.description = "";
            this.options = new AssetOptions(id);
            this.dynamicAssetDataId = ChainObject.parse("2.3.0");
        }
    */
}
