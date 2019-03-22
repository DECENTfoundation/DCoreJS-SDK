import { classToPlain } from "class-transformer";
import { Transaction } from "../../../models/Transaction";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class VerifyAuthority extends BaseRequest<boolean> {
    constructor(
        transaction: Transaction,
    ) {
        super(
            ApiGroup.Database,
            "verify_authority",
            [classToPlain(transaction)],
        );
    }
}
