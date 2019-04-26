import { plainToClass, Transform } from "class-transformer";
import { AccountCreateOperation } from "../../models/operation/AccountCreateOperation";
import { AccountUpdateOperation } from "../../models/operation/AccountUpdateOperation";
import { AddOrUpdateContentOperation } from "../../models/operation/AddOrUpdateContentOperation";
import { AssetClaimFeesOperation } from "../../models/operation/AssetClaimFeesOperation";
import { AssetCreateOperation } from "../../models/operation/AssetCreateOperation";
import { AssetFundPoolsOperation } from "../../models/operation/AssetFundPoolsOperation";
import { AssetIssueOperation } from "../../models/operation/AssetIssueOperation";
import { AssetPublishFeedOperation } from "../../models/operation/AssetPublishFeedOperation";
import { AssetReserveOperation } from "../../models/operation/AssetReserveOperation";
import { AssetUpdateAdvancedOperation } from "../../models/operation/AssetUpdateAdvancedOperation";
import { AssetUpdateMonitoredOperation } from "../../models/operation/AssetUpdateMonitoredOperation";
import { AssetUpdateOperation } from "../../models/operation/AssetUpdateOperation";
import { CustomOperation } from "../../models/operation/CustomOperation";
import { EmptyOperation } from "../../models/operation/EmptyOperation";
import { LeaveRatingAndCommentOperation } from "../../models/operation/LeaveRatingAndCommentOperation";
import { PurchaseContentOperation } from "../../models/operation/PurchaseContentOperation";
import { RemoveContentOperation } from "../../models/operation/RemoveContentOperation";
import { TransferOperation } from "../../models/operation/TransferOperation";

export function OperationsToClass(target: any, key: string): void {
    return Transform((value: Array<[number, object]>) =>
        value.map(([id, op]) => plainToClass(OPERATIONS_CTOR[id], op)), { toClassOnly: true })(target, key);
}

export function OperationToClass(target: any, key: string): void {
    return Transform(([id, op]: [number, object]) => plainToClass(OPERATIONS_CTOR[id], op), { toClassOnly: true })(target, key);
}

export const OPERATIONS_CTOR = [
    TransferOperation, // 0
    AccountCreateOperation,
    AccountUpdateOperation,
    AssetCreateOperation,
    AssetIssueOperation,
    AssetPublishFeedOperation, // 5
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
    LeaveRatingAndCommentOperation,
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
    AssetFundPoolsOperation,
    AssetReserveOperation,
    AssetClaimFeesOperation, // 35
    AssetUpdateOperation,
    AssetUpdateMonitoredOperation,
    EmptyOperation,
    TransferOperation,
    AssetUpdateAdvancedOperation, // 40
];
