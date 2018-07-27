import { Expose } from "class-transformer";
import { AssetAmount } from "../AssetAmount";
import { OperationType } from "../OperationType";

export abstract class BaseOperation {
    @Expose({ name: "extensions" })
    public extensions: any[] = [];

    @Expose({ name: "fee" })
    public fee: AssetAmount;

    protected constructor(public type: OperationType) {
    }
}
