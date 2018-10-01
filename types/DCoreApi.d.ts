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
export declare class DCoreApi {
    private core;
    account: AccountApi;
    asset: AssetApi;
    authority: AuthorityApi;
    balance: BalanceApi;
    block: BlockApi;
    broadcast: BroadcastApi;
    content: ContentApi;
    general: GeneralApi;
    history: HistoryApi;
    mining: MiningApi;
    purchase: PurchaseApi;
    seeder: SeedersApi;
    subscription: SubscriptionApi;
    transaction: TransactionApi;
    constructor(core: DCoreSdk);
    disconnect(): void;
}
