import { plainToClass, Transform } from "class-transformer";
import { AccountCreateOperation } from "../../models/operation/AccountCreateOperation";
import { AccountUpdateOperation } from "../../models/operation/AccountUpdateOperation";
import { AddOrUpdateContentOperation } from "../../models/operation/AddOrUpdateContentOperation";
import { CustomOperation } from "../../models/operation/CustomOperation";
import { EmptyOperation } from "../../models/operation/EmptyOperation";
import { PurchaseContentOperation } from "../../models/operation/PurchaseContentOperation";
import { RemoveContentOperation } from "../../models/operation/RemoveContentOperation";
import { TransferOperation } from "../../models/operation/TransferOperation";

export function OperationsToClass(target: any, key: string): void {
    return Transform((value: Array<[number, object]>) =>
        value.map(([id, op]) => plainToClass(OPERATIONS_CTR[id], op)), { toClassOnly: true })(target, key);
}

export const OPERATIONS_CTR = [
    TransferOperation, // 0
    AccountCreateOperation,
    AccountUpdateOperation,
    EmptyOperation,
    EmptyOperation,
    EmptyOperation, // 5
    EmptyOperation,
    EmptyOperation,
    EmptyOperation,
    EmptyOperation,
    EmptyOperation, // 10
    EmptyOperation,
    EmptyOperation,
    EmptyOperation,
    EmptyOperation,
    EmptyOperation, // 15
    EmptyOperation,
    EmptyOperation,
    CustomOperation,
    EmptyOperation,
    AddOrUpdateContentOperation, // 20
    PurchaseContentOperation,
    EmptyOperation,
    EmptyOperation,
    EmptyOperation,
    EmptyOperation, // 25
    EmptyOperation,
    EmptyOperation,
    EmptyOperation,
    EmptyOperation,
    EmptyOperation, // 30
    EmptyOperation,
    RemoveContentOperation,
    EmptyOperation,
    EmptyOperation,
    EmptyOperation, // 35
    EmptyOperation,
    EmptyOperation,
    EmptyOperation,
    TransferOperation, // 39
];
