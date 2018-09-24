import { Expose, Transform, Type } from "class-transformer";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { Memo } from "./Memo";

export class TransactionDetail {

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "id" })
    public id: ChainObject;

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "m_from_account" })
    public from: ChainObject;

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "m_to_account" })
    public to: ChainObject;

    @Expose({ name: "m_operation_type" })
    public type: number;

    @Type(() => AssetAmount)
    @Expose({ name: "m_transaction_amount" })
    public amount: AssetAmount;

    @Type(() => Memo)
    @Expose({ name: "m_transaction_encrypted_memo" })
    public memo?: Memo;

    @Type(() => AssetAmount)
    @Expose({ name: "m_transaction_fee" })
    public fee: AssetAmount;

    @Expose({ name: "m_str_description" })
    public description: string;

    @Type(() => Date)
    @Expose({ name: "m_timestamp" })
    public timestamp: Date;
}
