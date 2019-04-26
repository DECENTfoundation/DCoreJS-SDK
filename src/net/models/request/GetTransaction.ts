import { plainToClass } from "class-transformer";
import * as Long from "long";
import { ProcessedTransaction } from "../../../models/ProcessedTransaction";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetTransaction extends BaseRequest<ProcessedTransaction> {
    constructor(
        blockNum: Long | number,
        trxInBlock: Long | number,
    ) {
        super(
            ApiGroup.Database,
            "get_transaction",
            [typeof blockNum === "number" ? blockNum : blockNum.toString(), typeof trxInBlock === "number" ? trxInBlock : trxInBlock.toString()],
            (value: object) => plainToClass(ProcessedTransaction, value),
        );
    }
}
