import { classToPlain, Expose, Transform } from "class-transformer";
import { OperationToClass } from "../net/adapter/OperationAdapter";
import { ChainObjectToClass, ChainObjectToPlain } from "../net/adapter/TypeAdapters";
import { ChainObject } from "./ChainObject";
import { BaseOperation } from "./operation/BaseOperation";

export class OperationHistory {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @Transform((values: any[], obj: OperationHistory) => [obj.op.type, classToPlain(obj.op)], { toPlainOnly: true })
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
