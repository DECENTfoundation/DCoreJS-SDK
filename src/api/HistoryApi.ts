import * as _ from "lodash";
import { forkJoin, Observable, of, zip } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { DCoreApi } from "../DCoreApi";
import { BalanceChange } from "../models/BalanceChange";
import { ChainObject } from "../models/ChainObject";
import { ObjectType } from "../models/ObjectType";
import { OperationType } from "../models/operation/OperationType";
import { TransferOperation } from "../models/operation/TransferOperation";
import { OperationHistory } from "../models/OperationHistory";
import { TransferComposite } from "../models/TransferComposite";
import { GetAccountBalanceForTransaction } from "../net/models/request/GetAccountBalanceForTransaction";
import { GetAccountHistory } from "../net/models/request/GetAccountHistory";
import { GetObjects } from "../net/models/request/GetObjects";
import { GetRelativeAccountHistory } from "../net/models/request/GetRelativeAccountHistory";
import { SearchAccountBalanceHistory } from "../net/models/request/SearchAccountBalanceHistory";
import { toMap } from "../utils/Utils";
import { BaseApi } from "./BaseApi";

export class HistoryApi extends BaseApi {
    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Returns balance operation on the account and operation id.
     *
     * @param accountId object id of the account whose history should be queried, 1.2.*
     * @param operationId object id of the history object, 1.7.*
     *
     * @return an balance operation change
     */
    public getOperation(
        accountId: ChainObject,
        operationId: ChainObject,
    ): Observable<BalanceChange> {
        return this.request(new GetAccountBalanceForTransaction(accountId, operationId));
    }

    /**
     * Get account history of operations.
     *
     * @param accountId object id of the account whose history should be queried, 1.2.*
     * @param startId id of the history object to start from, use {@link ObjectType.OperationHistory.genericId} to ignore
     * @param stopId id of the history object to stop at, use {@link ObjectType.OperationHistory.genericId} to ignore
     * @param limit number of entries, max 100
     *
     * @return a list of operations performed by account, ordered from most recent to oldest
     */
    public listOperations(
        accountId: ChainObject,
        startId: ChainObject = ObjectType.OperationHistory.genericId(),
        stopId: ChainObject = ObjectType.OperationHistory.genericId(),
        limit: number = 100,
    ): Observable<OperationHistory[]> {
        return this.request(new GetAccountHistory(accountId, stopId, limit, startId));
    }

    /**
     * Get account history of operations.
     *
     * @param accountId object id of the account whose history should be queried, 1.2.*
     * @param start sequence number of the most recent operation to retrieve. 0 is default, which will start querying from the most recent operation
     * @param limit  maximum number of operations to retrieve (must not exceed 100)
     *
     * @return a list of operations performed by account, ordered from most recent to oldest
     */
    public listOperationsRelative(
        accountId: ChainObject,
        start: number = 0,
        limit: number = 100,
    ): Observable<OperationHistory[]> {
        return this.request(new GetRelativeAccountHistory(accountId, 0, limit, start));
    }

    /**
     * Returns the most recent balance operations on the named account.
     * This returns a list of operation history objects, which describe activity on the account.
     *
     * @param accountId object id of the account whose history should be queried, 1.2.*
     * @param assets list of asset object ids to filter or empty for all assets
     * @param recipientAccount partner account object id to filter transfers to specific account, 1.2.* or null
     * @param fromBlock filtering parameter, starting block number (can be determined from time) or zero when not used
     * @param toBlock filtering parameter, ending block number or zero when not used
     * @param startOffset  starting offset from zero
     * @param limit the number of entries to return (starting from the most recent), max 100
     *
     * @return a list of balance changes
     */
    public findAllOperations(
        accountId: ChainObject,
        assets: ChainObject[] = [],
        recipientAccount?: ChainObject,
        fromBlock: number = 0,
        toBlock: number = 0,
        startOffset: number = 0,
        limit: number = 100,
    ): Observable<BalanceChange[]> {
        return this.request(new SearchAccountBalanceHistory(accountId, assets, recipientAccount, fromBlock, toBlock, startOffset, limit));
    }

    /**
     * Check if the operation is confirmed and cannot be reverted.
     *
     * @param operationId object id of the history object, 1.7.*
     */
    public isConfirmed(operationId: ChainObject): Observable<boolean> {
        return zip(
            this.api.generalApi.getDynamicGlobalProperties(),
            this.api.request(new GetObjects(OperationHistory, [operationId])).pipe(map((op) => op[0].blockNum)),
        )
            .pipe(map(([props, blockNum]) => blockNum <= props.lastIrreversibleBlockNum));
    }

    /**
     * Returns the most recent transfer operations on the named account.
     * This returns a list of history composite objects, containing resolved accounts, assets and block.
     * Pages through whole history and calls multiple apis to fetch all related data, experimental use only.
     *
     * @param accountId object id of the account whose history should be queried, 1.2.*
     * @param assets list of asset object ids to filter or empty for all assets
     * @param recipientAccount partner account object id to filter transfers to specific account, 1.2.* or null
     * @param offset block number to search from
     * @param limit the number of entries to return (starting from the most recent), max 100
     *
     * @return a list of balance changes
     */
    public findAllTransfers(
        accountId: ChainObject,
        assets: ChainObject[] = [],
        recipientAccount?: ChainObject,
        offset: number = Number.MAX_SAFE_INTEGER,
        limit: number = 100,
    ): Observable<TransferComposite[]> {
        const isTransfer = (type: OperationType) => type === OperationType.Transfer || type === OperationType.Transfer2;
        const onePage = (off: number) => this.findAllOperations(accountId, assets, recipientAccount, 1, off, 0, 100);
        const paged = (off: number, lim: number): Observable<BalanceChange[]> => onePage(off).pipe(
            flatMap((ops) => {
                const trfs = ops.filter((op) => isTransfer(op.operation.op.type));
                if (trfs.length >= lim) {
                    return of(trfs.slice(0, lim));
                } else {
                    return paged(_.last(ops)!.operation.blockNum - 1, lim - trfs.length).pipe(map((next) => _.concat(trfs, next)));
                }
            }));

        const merged = (ops: BalanceChange[]) => {
            const ids = _.uniqWith(_.flatten(
                ops.map((op) => (op.operation.op as TransferOperation)).map((op) => [op.from, op.to]),
            ), ChainObject.comparator);
            const accountIds = ids.filter((id) => id.objectType === ObjectType.Account);
            const contentIds = ids.filter((id) => id.objectType === ObjectType.ContentObject);
            const assetIds = _.uniqWith(_.concat(
                ops.map((op) => (op.operation.op as TransferOperation).amount.assetId),
                ops.map((op) => op.fee.assetId),
            ), ChainObject.comparator);
            const blockNums = _.uniq(ops.map((op) => op.operation.blockNum));

            return zip(
                of(ops),
                this.api.accountApi.getAll(accountIds).pipe(map((list) => toMap(list, (acc) => acc.id.objectId))),
                this.api.contentApi.getAll(contentIds).pipe(map((list) => toMap(list, (c) => c.id.objectId))),
                this.api.assetApi.getAll(assetIds).pipe(map((list) => toMap(list, (asset) => asset.id.objectId))),
                forkJoin(blockNums.map((b) => this.api.blockApi.getHeader(b)))
                    .pipe(map((list, idx) => toMap(list, (b) => b.blockNum))),
            );
        };

        return paged(offset, limit).pipe(
            flatMap((ops) => merged(ops)),
            map(([ops, account, content, asset, block]) => ops.map((op) => {
                const trf = op.operation.op as TransferOperation;
                return new TransferComposite(
                    op.operation.id,
                    trf,
                    op.balance,
                    op.fee,
                    account.get(trf.from.objectId)!,
                    asset.get(trf.amount.assetId.objectId)!,
                    block.get(op.operation.blockNum)!,
                    asset.get(op.fee.assetId.objectId)!,
                    account.get(trf.to.objectId),
                    content.get(trf.to.objectId),
                );
            })),
        );
    }
}
