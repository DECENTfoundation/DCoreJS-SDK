import { classToPlain, plainToClass } from "class-transformer";
import { Address } from "../../../crypto/Address";
import { Transaction } from "../../../models/Transaction";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetRequiredSignatures extends BaseRequest<Address[]> {
    constructor(
        transaction: Transaction,
        keys: Address[],
    ) {
        super(
            ApiGroup.Database,
            "get_required_signatures",
            [classToPlain(transaction), keys.map((address) => address.encoded)],
            (value: object[]) => plainToClass(Address, value),
        );
    }
}
