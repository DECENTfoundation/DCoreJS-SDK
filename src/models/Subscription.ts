import { Expose } from "class-transformer";
import { Moment } from "moment";
import { ChainObject } from "./ChainObject";

export class Subscription {
    @Expose({ name: "from" })
    public from: ChainObject;

    @Expose({ name: "to" })
    public to: ChainObject;

    @Expose({ name: "expiration" })
    public expiration: Moment;

    @Expose({ name: "automatic_renewal" })
    public renewal: boolean;
}
