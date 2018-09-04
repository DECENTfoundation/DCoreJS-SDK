import { OperationType } from "../OperationType";
import { BaseOperation } from "./BaseOperation";

export class EmptyOperation extends BaseOperation {
    constructor(type: OperationType) {
        super(type);
    }
}
