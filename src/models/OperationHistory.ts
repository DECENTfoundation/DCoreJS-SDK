import { Expose, Type } from "class-transformer";
import { ChainObject } from "./ChainObject";

export class OperationHistory {
    @Type(() => ChainObject)
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "op" })
    public op: any;

    @Expose({ name: "result" })
    public result: any;

    @Expose({ name: "block_num" })
    public blockNum: number;

    @Expose({ name: "trx_num" })
    public trxNum: number;

    @Expose({ name: "op_in_trx" })
    public opNum: number;

    @Expose({ name: "virtual_op" })
    public virtualOp: number;
}
