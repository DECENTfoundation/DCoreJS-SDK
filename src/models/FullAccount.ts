import { Expose, Type } from "class-transformer";
import { Account } from "./Account";
import { AccountBalance } from "./AccountBalance";
import { AccountStatistics } from "./AccountStatistics";
import { Miner } from "./Miner";

export class FullAccount {

    @Type(() => Account)
    @Expose({ name: "account" })
    public account: Account;

    @Type(() => AccountStatistics)
    @Expose({ name: "statistics" })
    public statistics: AccountStatistics;

    @Expose({ name: "registrar_name" })
    public registrarName: string;

    @Type(() => Miner)
    @Expose({ name: "votes" })
    public votes: Miner[];

    @Type(() => AccountBalance)
    @Expose({ name: "balances" })
    public balances: AccountBalance[];

    // todo
    @Expose({ name: "vesting_balances" })
    public vestingBalances: object[];

    // todo
    @Expose({ name: "proposals" })
    public proposals: object[];

}
