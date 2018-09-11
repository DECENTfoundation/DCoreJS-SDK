import { Expose, Transform } from "class-transformer";
import { ChainObject } from "./ChainObject";

export class OperationHistory {

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Expose({ name: "id" })
    public id: ChainObject;

    // todo parse operation by type
    @Expose({ name: "op" })
    public op: any;

    @Expose({ name: "result" })
    public result: any;

    @Expose({ name: "block_num" })
    public blockNum: number;

    @Expose({ name: "trx_in_block" })
    public trxInBlock: number;

    @Expose({ name: "op_in_trx" })
    public opNum: number;

    @Expose({ name: "virtual_op" })
    public virtualOp: number;
}
