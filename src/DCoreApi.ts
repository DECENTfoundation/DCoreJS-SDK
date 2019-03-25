import { Duration } from "moment";
import { Observable } from "rxjs";
import { AccountApi } from "./api/AccountApi";
import { AssetApi } from "./api/AssetApi";
import { AuthorityApi } from "./api/AuthorityApi";
import { BalanceApi } from "./api/BalanceApi";
import { BlockApi } from "./api/BlockApi";
import { BroadcastApi } from "./api/BroadcastApi";
import { CallbackApi } from "./api/CallbackApi";
import { ContentApi } from "./api/ContentApi";
import { GeneralApi } from "./api/GeneralApi";
import { HistoryApi } from "./api/HistoryApi";
import { MessageApi } from "./api/MessageApi";
import { MiningApi } from "./api/MiningApi";
import { PurchaseApi } from "./api/PurchaseApi";
import { SeedersApi } from "./api/SeedersApi";
import { SubscriptionApi } from "./api/SubscriptionApi";
import { TransactionApi } from "./api/TransactionApi";
import { ValidationApi } from "./api/ValidationApi";
import { DCoreConstants } from "./DCoreConstants";
import { DCoreSdk } from "./DCoreSdk";
import { BaseRequest } from "./net/models/request/BaseRequest";
import { WithCallback } from "./net/models/request/WithCallback";

export class DCoreApi {

    public transactionExpiration: Duration = DCoreConstants.EXPIRATION_DEFAULT;

    public accountApi: AccountApi = new AccountApi(this);
    public assetApi: AssetApi = new AssetApi(this);
    public authorityApi: AuthorityApi = new AuthorityApi(this);
    public balanceApi: BalanceApi = new BalanceApi(this);
    public blockApi: BlockApi = new BlockApi(this);
    public broadcastApi: BroadcastApi = new BroadcastApi(this);
    public callbackApi: CallbackApi = new CallbackApi(this);
    public contentApi: ContentApi = new ContentApi(this);
    public generalApi: GeneralApi = new GeneralApi(this);
    public historyApi: HistoryApi = new HistoryApi(this);
    public messageApi: MessageApi = new MessageApi(this);
    public miningApi: MiningApi = new MiningApi(this);
    public purchaseApi: PurchaseApi = new PurchaseApi(this);
    public seedersApi: SeedersApi = new SeedersApi(this);
    public subscriptionApi: SubscriptionApi = new SubscriptionApi(this);
    public transactionApi: TransactionApi = new TransactionApi(this, this.core);
    public validationApi: ValidationApi = new ValidationApi(this);

    constructor(private core: DCoreSdk) {
    }

    public request<T>(request: BaseRequest<T>): Observable<T> {
        return this.core.request(request);
    }

    public requestStream<T>(request: BaseRequest<T> & WithCallback): Observable<T> {
        return this.core.requestStream(request);
    }

    public disconnect() {
        this.core.disconnect();
    }

    public set timeout(millis: number) {
        this.core.timeout = millis;
    }
}
