import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { Memo } from "./Memo";
export declare class TransactionDetail {
    id: ChainObject;
    from: ChainObject;
    to: ChainObject;
    type: number;
    amount: AssetAmount;
    memo?: Memo;
    fee: AssetAmount;
    description: string;
    timestamp: Date;
}
