import { Expose } from "class-transformer";
import { Fee } from "../../DCoreSdk";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { ChainObject } from "../ChainObject";
import { PriceFeed } from "../PriceFeed";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

/**
 * skip, cannot create monitored asset, also only miner account can publish feeds
 * asset_create_op has account_id_type fee_payer()const { return monitored_asset_opts.valid() ? account_id_type() : issuer; }
 * therefore throws Missing Active Authority 1.2.0
 */
export class AssetPublishFeedOperation extends BaseOperation {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "publisher" })
    public publisher: ChainObject;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "asset_id" })
    public asset: ChainObject;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "feed" })
    public feed: PriceFeed;

    constructor(publisher: ChainObject, asset: ChainObject, feed: PriceFeed, fee?: Fee) {
        super(OperationType.AssetPublishFeed, fee);
        this.publisher = publisher;
        this.asset = asset;
        this.feed = feed;
    }
}
