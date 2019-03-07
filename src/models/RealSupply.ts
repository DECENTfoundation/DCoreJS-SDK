import { Expose, Transform } from "class-transformer";
import * as Long from "long";

export class RealSupply {

    @Transform((value: string) => Long.fromValue(value), { toClassOnly: true })
    @Expose({ name: "account_balances" })
    public accountBalances: Long;

    @Transform((value: string) => Long.fromValue(value), { toClassOnly: true })
    @Expose({ name: "vesting_balances" })
    public vestingBalances: Long;

    @Transform((value: string) => Long.fromValue(value), { toClassOnly: true })
    @Expose({ name: "escrows" })
    public escrows: Long;

    @Transform((value: string) => Long.fromValue(value), { toClassOnly: true })
    @Expose({ name: "pools" })
    public pools: Long;
}
