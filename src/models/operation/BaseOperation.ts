import { Exclude, Expose, Type } from "class-transformer";
import { AssetAmount } from "../AssetAmount";
import { OperationType } from "./OperationType";

export abstract class BaseOperation {
    @Expose({ name: "extensions" })
    public extensions: any[] = [];

    @Type(() => AssetAmount)
    @Expose({ name: "fee" })
    public fee?: AssetAmount;

    @Exclude()
    public type: OperationType;

    protected constructor(type: OperationType) {
        this.type = type;
    }
}
