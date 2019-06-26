import { Duration } from "moment";
import { Observable } from "rxjs";
import { AccountApi } from "./api/AccountApi";
import { AssetApi } from "./api/AssetApi";
import { BalanceApi } from "./api/BalanceApi";
import { BlockApi } from "./api/BlockApi";
import { BroadcastApi } from "./api/BroadcastApi";
import { CallbackApi } from "./api/CallbackApi";
import { ContentApi } from "./api/ContentApi";
import { GeneralApi } from "./api/GeneralApi";
import { HistoryApi } from "./api/HistoryApi";
import { MessageApi } from "./api/MessageApi";
import { MiningApi } from "./api/MiningApi";
import { NftApi } from "./api/NftApi";
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

    public readonly accountApi: AccountApi = new AccountApi(this);
    public readonly assetApi: AssetApi = new AssetApi(this);
    public readonly balanceApi: BalanceApi = new BalanceApi(this);
    public readonly blockApi: BlockApi = new BlockApi(this);
    public readonly broadcastApi: BroadcastApi = new BroadcastApi(this);
    public readonly callbackApi: CallbackApi = new CallbackApi(this);
    public readonly contentApi: ContentApi = new ContentApi(this);
    public readonly generalApi: GeneralApi = new GeneralApi(this);
    public readonly historyApi: HistoryApi = new HistoryApi(this);
    public readonly messageApi: MessageApi = new MessageApi(this);
    public readonly miningApi: MiningApi = new MiningApi(this);
    public readonly purchaseApi: PurchaseApi = new PurchaseApi(this);
    public readonly seedersApi: SeedersApi = new SeedersApi(this);
    public readonly subscriptionApi: SubscriptionApi = new SubscriptionApi(this);
    public readonly transactionApi: TransactionApi = new TransactionApi(this, this.core);
    public readonly validationApi: ValidationApi = new ValidationApi(this);
    public readonly nftApi: NftApi = new NftApi(this);

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
