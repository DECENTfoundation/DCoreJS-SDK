import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { ChainObject } from "../models/ChainObject";
import { Subscription } from "../models/Subscription";
import { GetSubscription } from "../net/models/request/GetSubscription";
import { ListActiveSubscriptionsByAuthor } from "../net/models/request/ListActiveSubscriptionsByAuthor";
import { ListActiveSubscriptionsByConsumer } from "../net/models/request/ListActiveSubscriptionsByConsumer";
import { ListSubscriptionsByAuthor } from "../net/models/request/ListSubscriptionsByAuthor";
import { ListSubscriptionsByConsumer } from "../net/models/request/ListSubscriptionsByConsumer";
import { BaseApi } from "./BaseApi";

export class SubscriptionApi extends BaseApi {
    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Get a subscription object by ID.
     *
     * @param id subscription object id, 2.15.*
     *
     * @return the subscription object corresponding to the provided ID, [ObjectNotFoundException] otherwise
     */
    // todo subscriptions: wait for subscribe operation to test
    public get(id: ChainObject): Observable<Subscription> {
        return this.request(new GetSubscription((id)));
    }

    /**
     * Get a list of active (not expired) subscriptions by account (consumer).
     *
     * @param consumer consumer account object id, 1.2.*
     * @param count maximum number of subscription objects to fetch (must not exceed 100)
     *
     * @return a list of active subscription objects
     */
    public getAllActiveByConsumer(consumer: ChainObject, count: number = 100): Observable<Subscription[]> {
        return this.request(new ListActiveSubscriptionsByConsumer(consumer, count));
    }

    /**
     * Get a list of active (not expired) subscriptions by account (author).
     *
     * @param author author account object id, 1.2.*
     * @param count maximum number of subscription objects to fetch (must not exceed 100)
     *
     * @return a list of active subscription objects
     */
    public getAllActiveByAuthor(author: ChainObject, count: number = 100): Observable<Subscription[]> {
        return this.request(new ListActiveSubscriptionsByAuthor(author, count));
    }

    /**
     * Get a list of subscriptions by account (consumer).
     *
     * @param consumer consumer account object id, 1.2.*
     * @param count maximum number of subscription objects to fetch (must not exceed 100)
     *
     * @return a list of subscription objects
     */
    public getAllByConsumer(consumer: ChainObject, count: number = 100): Observable<Subscription[]> {
        return this.request(new ListSubscriptionsByConsumer(consumer, count));
    }

    /**
     * Get a list of subscriptions by account (author).
     *
     * @param author author account object id, 1.2.*
     * @param count maximum number of subscription objects to fetch (must not exceed 100)
     *
     * @return a list of subscription objects
     */
    public getAllByAuthor(author: ChainObject, count: number = 100): Observable<Subscription[]> {
        return this.request(new ListSubscriptionsByAuthor(author, count));
    }
}
