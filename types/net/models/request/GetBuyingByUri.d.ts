import { ChainObject } from "../../../models/ChainObject";
import { Purchase } from "../../../models/Purchase";
import { BaseRequest } from "./BaseRequest";
export declare class GetBuyingByUri extends BaseRequest<Purchase> {
    constructor(consumer: ChainObject, uri: string);
}
