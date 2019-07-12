import { classToPlain, Expose, Transform, Type } from "class-transformer";
import * as _ from "lodash";
import { AssetAmount } from "./AssetAmount";
import { OperationHistory } from "./OperationHistory";

export class BalanceChange {

    @Type(() => OperationHistory)
    @Expose({ name: "hist_object" })
    public operation: OperationHistory;

    @Transform((value: any, obj: BalanceChange) => obj.balance.map((it) => [{ asset0: classToPlain(it[0]) }, { asset1: classToPlain(it[1]) }]), { toPlainOnly: true })
    @Transform((value: object) => [_.get(value, "asset0"), _.get(value, "asset1")], { toClassOnly: true })
    @Expose({ name: "balance" })
    public balance: Array<[AssetAmount, AssetAmount]>;

    @Type(() => AssetAmount)
    @Expose({ name: "fee" })
    public fee: AssetAmount;
}
