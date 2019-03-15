import { classToPlain, plainToClass } from "class-transformer";
import { Address } from "../../../crypto/Address";
import { Transaction } from "../../../models/Transaction";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetPotentialSignatures extends BaseRequest<Address[]> {
    constructor(
        transaction: Transaction,
    ) {
        super(
            ApiGroup.Database,
            "get_potential_signatures",
            [classToPlain(transaction)],
            (value: object[]) => plainToClass(Address, value),
        );
    }
}
