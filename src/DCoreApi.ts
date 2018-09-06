import { AccountApi } from "./api/AccountApi";
import { AssetApi } from "./api/AssetApi";
import { AuthorityApi } from "./api/AuthorityApi";
import { BalanceApi } from "./api/BalanceApi";
import { BlockApi } from "./api/BlockApi";
import { BroadcastApi } from "./api/BroadcastApi";
import { ContentApi } from "./api/ContentApi";
import { GeneralApi } from "./api/GeneralApi";
import { HistoryApi } from "./api/HistoryApi";
import { MiningApi } from "./api/MiningApi";
import { PurchaseApi } from "./api/PurchaseApi";
import { SeedersApi } from "./api/SeedersApi";
import { SubscriptionApi } from "./api/SubscriptionApi";
import { TransactionApi } from "./api/TransactionApi";
import { DCoreSdk } from "./DCoreSdk";

export class DCoreApi {
    public account: AccountApi = new AccountApi(this.core);
    public asset: AssetApi;
    public authority: AuthorityApi;
    public balance: BalanceApi;
    public block: BlockApi;
    public broadcast: BroadcastApi;
    public content: ContentApi;
    public general: GeneralApi;
    public history: HistoryApi;
    public mining: MiningApi;
    public purchase: PurchaseApi;
    public seeder: SeedersApi;
    public subscription: SubscriptionApi;
    public transaction: TransactionApi;

    constructor(private core: DCoreSdk) {
    }
}
