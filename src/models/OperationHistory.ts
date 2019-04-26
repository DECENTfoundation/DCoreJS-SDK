import { Expose } from "class-transformer";
import * as Long from "long";
import { OperationToClass } from "../net/adapter/OperationAdapter";
import { ChainObjectToClass, LongToClass } from "../net/adapter/TypeAdapters";
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

    @LongToClass
    @Expose({ name: "block_num" })
    public blockNum: Long;

    @LongToClass
    @Expose({ name: "trx_in_block" })
    public trxInBlock: Long;

    @LongToClass
    @Expose({ name: "op_in_trx" })
    public opNum: Long;

    @LongToClass
    @Expose({ name: "virtual_op" })
    public virtualOp: Long;
}
