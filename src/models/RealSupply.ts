import { Expose } from "class-transformer";
import * as Long from "long";
import { LongToClassSigned, LongToPlain } from "../net/adapter/TypeAdapters";

export class RealSupply {

    // Int64
    @LongToPlain
    @LongToClassSigned
    @Expose({ name: "account_balances" })
    public accountBalances: Long;

    // Int64
    @LongToPlain
    @LongToClassSigned
    @Expose({ name: "vesting_balances" })
    public vestingBalances: Long;

    // Int64
    @LongToPlain
    @LongToClassSigned
    @Expose({ name: "escrows" })
    public escrows: Long;

    // Int64
    @LongToPlain
    @LongToClassSigned
    @Expose({ name: "pools" })
    public pools: Long;
}
