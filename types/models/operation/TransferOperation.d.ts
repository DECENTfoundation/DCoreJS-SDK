import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { Memo } from "../Memo";
import { BaseOperation } from "./BaseOperation";
/**
 * Transfer operation constructor
 *
 * @param from account object id of the sender
 * @param to account object id of the receiver
 * @param amount an amount and asset type to transfer
 * @param memo optional string note
 */
export declare class TransferOperation extends BaseOperation {
    from: ChainObject;
    to: ChainObject;
    amount: AssetAmount;
    memo?: Memo;
    constructor(from: ChainObject, to: ChainObject, amount: AssetAmount, memo?: Memo, fee?: AssetAmount);
}
