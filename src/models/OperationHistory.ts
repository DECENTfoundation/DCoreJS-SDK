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

    @Expose({ name: "block_num" })
    public blockNum: number;

    @Expose({ name: "trx_in_block" })
    public trxInBlock: number;

    @Expose({ name: "op_in_trx" })
    public opNum: number;

    @Expose({ name: "virtual_op" })
    public virtualOp: number;
}
