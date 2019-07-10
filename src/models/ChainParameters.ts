import { Expose } from "class-transformer";

export class ChainParameters {

    // UInt16
    @Expose({ name: "min_miner_count" })
    public minMinerCount: number;

    // UInt32
    @Expose({ name: "num_special_accounts" })
    public specialAccounts: number;

    // UInt32
    @Expose({ name: "num_special_assets" })
    public specialAssets: number;
}
