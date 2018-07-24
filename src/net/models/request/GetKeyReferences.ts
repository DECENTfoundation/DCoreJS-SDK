import { plainToClass } from "class-transformer";
import { Address } from "../../../crypto/Address";
import { ChainObject } from "../../../models/ChainObject";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetKeyReferences extends BaseRequest<ChainObject[][]> {
    constructor(
        addresses: Address[],
    ) {
        super(
            ApiGroup.Database,
            "get_key_references",
            [addresses],
            (value: object[][]) => value.map((refs: object[]) => plainToClass(ChainObject, refs)),
        );
    }
}
