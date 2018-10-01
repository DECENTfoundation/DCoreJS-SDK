import { Address } from "../../../crypto/Address";
import { ChainObject } from "../../../models/ChainObject";
import { BaseRequest } from "./BaseRequest";
export declare class GetKeyReferences extends BaseRequest<ChainObject[][]> {
    constructor(addresses: Address[]);
}
