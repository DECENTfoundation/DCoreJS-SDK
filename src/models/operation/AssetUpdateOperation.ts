import { Expose, Type } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { Asset } from "../Asset";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { ExchangeRate } from "../ExchangeRate";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class AssetUpdateOperation extends BaseOperation {

    public static create(asset: Asset): AssetUpdateOperation {
        return new AssetUpdateOperation(asset.issuer, asset.id, asset.options.exchangeRate, asset.description, asset.options.exchangeable, asset.options.maxSupply);
    }

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "issuer" })
    public issuer: ChainObject;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "asset_to_update" })
    public assetToUpdate: ChainObject;

    @Expose({ name: "new_description" })
    public newDescription: string;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "new_issuer" })
    public newIssuer?: ChainObject;

    @Expose({ name: "max_supply" })
    public maxSupply: number;

    @Type(() => ExchangeRate)
    @Expose({ name: "core_exchange_rate" })
    public coreExchangeRate: ExchangeRate;

    @Expose({ name: "is_exchangeable" })
    public exchangeable: boolean;

    constructor(
        issuer: ChainObject,
        assetToUpdate: ChainObject,
        coreExchangeRate: ExchangeRate,
        newDescription: string,
        exchangeable: boolean,
        maxSupply: number,
        newIssuer?: ChainObject,
        fee?: AssetAmount | ChainObject,
    ) {
        super(OperationType.UpdateUserIssuedAsset, fee);
        this.issuer = issuer;
        this.assetToUpdate = assetToUpdate;
        this.newDescription = newDescription;
        this.newIssuer = newIssuer;
        this.maxSupply = maxSupply;
        this.coreExchangeRate = coreExchangeRate;
        this.exchangeable = exchangeable;
    }
}
