import { Expose, Type } from "class-transformer";
import * as moment from "moment";
import { Moment } from "moment";
import { MomentToClass, MomentToPlain } from "../net/adapter/TypeAdapters";
import { PriceFeed } from "./PriceFeed";

export class MonitoredAssetOpts {

    @Expose({ name: "feeds" })
    public feeds: Array<[string, [string, object]]>; // Map<account_id, [time, priceFeed]>

    @Type(() => PriceFeed)
    @Expose({ name: "current_feed" })
    public currentFeed: PriceFeed;

    @MomentToPlain
    @MomentToClass
    @Expose({ name: "current_feed_publication_time" })
    public currentFeedPublicationTime: Moment;

    // UInt32
    @Expose({ name: "feed_lifetime_sec" })
    public feedLifetimeSec: number;

    // UInt8
    @Expose({ name: "minimum_feeds" })
    public minimumFeeds: number;

    constructor(feedLifetimeSec: number = 60 * 60 * 24, minimumFeeds: number = 1, currentFeed: PriceFeed = new PriceFeed()) {
        this.feedLifetimeSec = feedLifetimeSec;
        this.minimumFeeds = minimumFeeds;
        this.currentFeed = currentFeed;
        this.currentFeedPublicationTime = moment();
        this.feeds = [];
    }
}
