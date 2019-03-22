import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { CancelAllSubscriptions } from "../net/models/request/CancelAllSubscriptions";
import { SetBlockAppliedCallback } from "../net/models/request/SetBlockAppliedCallback";
import { SetContentUpdateCallback } from "../net/models/request/SetContentUpdateCallback";
import { SetPendingTransactionCallback } from "../net/models/request/SetPendingTransactionCallback";
import { SetSubscribeCallback } from "../net/models/request/SetSubscribeCallback";
import { BaseApi } from "./BaseApi";

export class CallbackApi extends BaseApi {
    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Stop receiving any notifications. This unsubscribes from all subscribed objects ({@link onGlobal} and {@link AccountApi.getFullAccounts}).
     */
    public cancelAll(): Observable<void> {
        return this.request(new CancelAllSubscriptions());
    }

    /**
     * Receive new block notifications. Cannot be cancelled.
     */
    public onBlockApplied(): Observable<object> {
        return this.request(new SetBlockAppliedCallback());
    }

    /**
     * Receive notifications on content update. Cannot be cancelled.
     *
     * @param uri content URI to monitor
     */
    public onContentUpdate(uri: string): Observable<object> {
        return this.request(new SetContentUpdateCallback(uri));
    }

    /**
     * Receive notifications on pending transactions. Cannot be cancelled.
     */
    public onPendingTransaction(): Observable<object> {
        return this.request(new SetPendingTransactionCallback());
    }

    /**
     * Subscribe to callbacks. Can be cancelled. with [cancelAll].
     *
     * @param clearFilter clear current subscriptions created with {@link AccountApi.getFullAccounts}
     */
    public onGlobal(clearFilter: boolean): Observable<object> {
        return this.request(new SetSubscribeCallback(clearFilter));
    }
}
