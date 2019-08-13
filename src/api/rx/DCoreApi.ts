import { DCoreClient } from "../../DCoreClient";
import { BaseCoreApi } from "../BaseCoreApi";
import { AccountApi } from "./AccountApi";
import { AssetApi } from "./AssetApi";
import { BalanceApi } from "./BalanceApi";
import { BlockApi } from "./BlockApi";
import { BroadcastApi } from "./BroadcastApi";
import { CallbackApi } from "./CallbackApi";
import { ContentApi } from "./ContentApi";
import { GeneralApi } from "./GeneralApi";
import { HistoryApi } from "./HistoryApi";
import { MessageApi } from "./MessageApi";
import { MiningApi } from "./MiningApi";
import { NftApi } from "./NftApi";
import { PurchaseApi } from "./PurchaseApi";
import { SeederApi } from "./SeederApi";
import { SubscriptionApi } from "./SubscriptionApi";
import { TransactionApi } from "./TransactionApi";
import { ValidationApi } from "./ValidationApi";

export class DCoreApi extends BaseCoreApi {

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
    public readonly seederApi: SeederApi = new SeederApi(this);
    public readonly subscriptionApi: SubscriptionApi = new SubscriptionApi(this);
    public readonly transactionApi: TransactionApi = new TransactionApi(this, this.core);
    public readonly validationApi: ValidationApi = new ValidationApi(this);
    public readonly nftApi: NftApi = new NftApi(this);

    constructor(public core: DCoreClient) {
        super(core);
    }

}
