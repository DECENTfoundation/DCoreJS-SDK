import { Expose } from "class-transformer";
import { OperationToClass } from "../net/adapter/OperationAdapter";
import { ChainObjectToClass } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";
import { BaseOperation } from "./operation/BaseOperation";

export class OperationHistory {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @OperationToClass
    @Expose({ name: "op" })
    public op: BaseOperation;

    @Expose({ name: "result" })
    public result: any;

    // UInt32
    @Expose({ name: "block_num" })
    public blockNum: number;

    // UInt16
    @Expose({ name: "trx_in_block" })
    public trxInBlock: number;

    // UInt16
    @Expose({ name: "op_in_trx" })
    public opNum: number;

    // UInt16
    @Expose({ name: "virtual_op" })
    public virtualOp: number;
}
