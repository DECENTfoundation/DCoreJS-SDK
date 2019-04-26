import { Expose } from "class-transformer";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";

export class VestingBalance {
    @Expose({ name: "owner" })
    public owner: ChainObject;

    @Expose({ name: "balance" })
    public balance: AssetAmount;

// todo
    @Expose({ name: "policy" })
    public policy: object;
}
