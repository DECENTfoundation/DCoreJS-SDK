import { ChainObject } from "../../../models/ChainObject";
import { OperationHistory } from "../../../models/OperationHistory";
import { BaseRequest } from "./BaseRequest";
export declare class GetAccountHistory extends BaseRequest<OperationHistory[]> {
    constructor(accountId: ChainObject, stopId?: ChainObject, limit?: number, startId?: ChainObject);
}
