import { Expose, Type } from "class-transformer";
import { Account } from "./Account";
import { AccountBalance } from "./AccountBalance";
import { AccountStatistics } from "./AccountStatistics";
import { Miner } from "./Miner";

export class FullAccount {

    @Expose({ name: "account" })
    @Type(() => Account)
    public account: Account;

    @Expose({ name: "statistics" })
    public statistics: AccountStatistics;

    @Expose({ name: "registrar_name" })
    public registrarName: string;

    @Expose({ name: "votes" })
    public votes: Miner[];

    @Expose({ name: "balances" })
    public balances: AccountBalance[];

    // todo
    @Expose({ name: "vesting_balances" })
    public vestingBalances: object[];

    // todo
    @Expose({ name: "proposals" })
    public proposals: object[];

}
