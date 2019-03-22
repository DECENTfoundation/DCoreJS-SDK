import { Expose } from "class-transformer";
import * as Long from "long";
import { ChainObjectToClass, LongToClass } from "../utils/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class OperationHistory {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    // todo parse operation by type
    @Expose({ name: "op" })
    public op: any;

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
