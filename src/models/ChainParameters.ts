import { Expose } from "class-transformer";

export class ChainParameters {

    @Expose({ name: "min_miner_count" })
    public minMinerCount: number;

    @Expose({ name: "num_special_accounts" })
    public specialAccounts: number;

    @Expose({ name: "num_special_assets" })
    public specialAssets: number;
}
