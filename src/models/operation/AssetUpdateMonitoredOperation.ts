import { Expose } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

/**
 * skip, cannot create
 * asset_create_op has account_id_type fee_payer()const { return monitored_asset_opts.valid() ? account_id_type() : issuer; }
 * therefore throws Missing Active Authority 1.2.0
 */
export class AssetUpdateMonitoredOperation extends BaseOperation {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "issuer" })
    public issuer: ChainObject;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "asset_to_update" })
    public assetToUpdate: ChainObject;

    @Expose({ name: "new_description" })
    public description: string;

    @Expose({ name: "new_feed_lifetime_sec" })
    public newFeedLifetime: number;

    @Expose({ name: "new_minimum_feeds" })
    public newMinimumFeeds: number;

    constructor(
        issuer: ChainObject,
        assetToUpdate: ChainObject,
        description: string,
        newFeedLifetime: number,
        newMinimumFeeds: number,
        fee?: AssetAmount | ChainObject,
    ) {
        super(OperationType.UpdateMonitoredAsset, fee);
        this.issuer = issuer;
        this.assetToUpdate = assetToUpdate;
        this.description = description;
        this.newFeedLifetime = newFeedLifetime;
        this.newMinimumFeeds = newMinimumFeeds;
    }
}
