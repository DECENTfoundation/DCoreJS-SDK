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
            [addresses.map((address) => address.encoded)],
            (values: string[][]) => values.map((refs) => refs.map((id) => ChainObject.parse(id))),
        );
    }
}
