import { Expose } from "class-transformer";
import { OperationType } from "../../net/models/OperationType";
import { AssetAmount } from "../AssetAmount";

export abstract class BaseOperation {
    @Expose({ name: "fee" })
    public fee: AssetAmount;

    protected constructor(
        public type: OperationType,
    ) {
    }
}
