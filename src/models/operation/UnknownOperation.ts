import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class UnknownOperation extends BaseOperation {
    constructor(public readonly id: number) {
        super(OperationType.Unknown);
    }
}
