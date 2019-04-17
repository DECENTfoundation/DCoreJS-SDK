import { Expose } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { PriceFeed } from "../PriceFeed";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

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

    constructor(publisher: ChainObject, asset: ChainObject, feed: PriceFeed, fee?: AssetAmount | ChainObject) {
        super(OperationType.AssetPublishFeed, fee);
        this.publisher = publisher;
        this.asset = asset;
        this.feed = feed;
    }
}
