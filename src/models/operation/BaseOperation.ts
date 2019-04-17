import { Exclude, Expose, Type } from "class-transformer";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { OperationType } from "./OperationType";

export abstract class BaseOperation {
    @Expose({ name: "extensions" })
    public extensions: any[] = [];

    @Type(() => AssetAmount)
    @Expose({ name: "fee" })
    public fee?: AssetAmount;

    @Exclude()
    public type: OperationType;

    @Exclude()
    public feeAssetId?: ChainObject;

    protected constructor(type: OperationType, fee?: AssetAmount | ChainObject) {
        this.type = type;
        this.setFee(fee);
    }

    public setFee(fee?: AssetAmount | ChainObject) {
        if (fee instanceof AssetAmount) {
            this.fee = fee;
        } else {
            this.feeAssetId = fee;
        }
    }
}
