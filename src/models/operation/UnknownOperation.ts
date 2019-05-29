import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class UnknownOperation extends BaseOperation {
    constructor() {
        super(OperationType.Unknown);
    }
}
