import { AssetAmount } from "../AssetAmount";
import { OperationType } from "../OperationType";
export declare abstract class BaseOperation {
    extensions: any[];
    fee: AssetAmount;
    type: OperationType;
    protected constructor(type: OperationType);
}
