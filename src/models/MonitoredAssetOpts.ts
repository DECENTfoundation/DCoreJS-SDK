import { Expose, Type } from "class-transformer";
import * as Long from "long";
import { Moment } from "moment";
import { LongToClass, MomentToClass } from "../utils/TypeAdapters";
import { CurrentFeed } from "./CurrentFeed";

export class MonitoredAssetOpts {

    @Expose({ name: "feeds" })
    public feeds: object;

    @Type(() => CurrentFeed)
    @Expose({ name: "current_feed" })
    public currentFeed: CurrentFeed;

    @MomentToClass
    @Expose({ name: "current_feed_publication_time" })
    public currentFeedPublicationTime: Moment;

    @LongToClass
    @Expose({ name: "feed_lifetime_sec" })
    public feedLifetimeSec: Long;

    @Expose({ name: "minimum_feeds" })
    public minimumFeeds: number;
}
