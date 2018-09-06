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
    public asset: AssetApi = new AssetApi(this.core);
    public authority: AuthorityApi = new AuthorityApi();
    public balance: BalanceApi = new BalanceApi(this.core, this);
    public block: BlockApi = new BlockApi();
    public broadcast: BroadcastApi = new BroadcastApi();
    public content: ContentApi = new ContentApi(this.core);
    public general: GeneralApi = new GeneralApi();
    public history: HistoryApi = new HistoryApi(this.core);
    public mining: MiningApi = new MiningApi(this.core);
    public purchase: PurchaseApi = new PurchaseApi(this.core);
    public seeder: SeedersApi = new SeedersApi();
    public subscription: SubscriptionApi = new SubscriptionApi();
    public transaction: TransactionApi = new TransactionApi(this.core);

    constructor(private core: DCoreSdk) {
    }
}
