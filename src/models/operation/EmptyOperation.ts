import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class EmptyOperation extends BaseOperation {
    constructor(type: OperationType) {
        super(type);
    }
}
