import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Address } from "../../crypto/Address";
import { DCoreConstants } from "../../DCoreConstants";
import { AssetAmount } from "../../models/AssetAmount";
import { ChainObject } from "../../models/ChainObject";
import { BaseOperation } from "../../models/operation/BaseOperation";
import { EmptyOperation } from "../../models/operation/EmptyOperation";
import { OperationType } from "../../models/operation/OperationType";
import { ProcessedTransaction } from "../../models/ProcessedTransaction";
import { Transaction } from "../../models/Transaction";
import { GetPotentialSignatures } from "../../net/models/request/GetPotentialSignatures";
import { GetRequiredFees } from "../../net/models/request/GetRequiredFees";
import { GetRequiredSignatures } from "../../net/models/request/GetRequiredSignatures";
import { ValidateTransaction } from "../../net/models/request/ValidateTransaction";
import { VerifyAccountAuthority } from "../../net/models/request/VerifyAccountAuthority";
import { VerifyAuthority } from "../../net/models/request/VerifyAuthority";
import { assertThrow } from "../../utils/Utils";
import { AssetApi } from "./AssetApi";
import { BaseApi } from "./BaseApi";
import { DCoreApi } from "./DCoreApi";

export type ValidationApiRx = ValidationApi;

export class ValidationApi extends BaseApi {

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * This API will take a partially signed transaction and a set of public keys that the owner has the ability to sign for
     * and return the minimal subset of public keys that should add signatures to the transaction.
     *
     * @param transaction partially signed transaction
     * @param keys available owner public keys
     *
     * @return public keys that should add signatures
     */
    public getRequiredSignatures(transaction: Transaction, keys: Address[]): Observable<Address[]> {
        return this.request(new GetRequiredSignatures(transaction, keys));
    }

    /**
     * This method will return the set of all public keys that could possibly sign for a given transaction.
     * This call can be used by wallets to filter their set of public keys to just the relevant subset prior to calling get_required_signatures() to get the minimum subset.
     *
     * @param transaction unsigned transaction
     *
     * @return public keys that can sign transaction
     */
    public getPotentialSignatures(transaction: Transaction): Observable<Address[]> {
        return this.request(new GetPotentialSignatures(transaction));
    }

    /**
     * Verifies required signatures of a transaction.
     *
     * @param transaction signed transaction to verify
     *
     * @return if the transaction has all of the required signatures
     */
    public verifyAuthority(transaction: Transaction): Observable<boolean> {
        return this.request(new VerifyAuthority(transaction));
    }

    /**
     * Verifies if the signers have enough authority to authorize an account.
     *
     * @param nameOrId account name or object id
     * @param keys signer keys
     *
     * @return if the signers have enough authority
     */
    public verifyAccountAuthority(nameOrId: string, keys: Address[]): Observable<boolean> {
        return this.request(new VerifyAccountAuthority(nameOrId, keys));
    }

    /**
     * Validates a transaction against the current state without broadcasting it on the network.
     *
     * @param transaction signed transaction
     *
     * @return {@link ProcessedTransaction} or fails with {@link DCoreError}
     */
    public validateTransaction(transaction: Transaction): Observable<ProcessedTransaction> {
        return this.request(new ValidateTransaction(transaction));
    }

    /**
     * Returns fees for operation.
     *
     * @param op list of operations
     * @param assetId asset id eg. DCT id is 1.3.0
     *
     * @return a list of fee asset amounts
     */
    public getFees(op: BaseOperation[], assetId: ChainObject = DCoreConstants.DCT_ASSET_ID): Observable<AssetAmount[]> {
        return this.request(new GetRequiredFees(op, assetId));
    }

    /**
     * Returns fee for any operation or operation type except for per size fees:
     *
     * {@link OperationType.ProposalCreate},
     * {@link OperationType.ProposalUpdate},
     * {@link OperationType.WithdrawPermissionClaim},
     * {@link OperationType.Custom}]
     *
     * @param op operation type or operation
     * @param assetId asset id eg. DCT id is 1.3.0
     *
     * @return a fee asset amount
     */
    public getFee(op: BaseOperation | OperationType, assetId: ChainObject = DCoreConstants.DCT_ASSET_ID): Observable<AssetAmount> {
        if (op instanceof BaseOperation) {
            return this.getFees([op], assetId).pipe(map((fee) => fee[0]));
        } else {
            assertThrow([
                OperationType.AssetCreate,
                OperationType.AssetIssue,
                OperationType.ProposalCreate,
                OperationType.ProposalUpdate,
                OperationType.WithdrawPermissionClaim,
                OperationType.Custom,
                OperationType.Assert,
                OperationType.ContentSubmit,
            ].indexOf(op) === -1, () => "operation type not allowed, pass full operation as arg");
            return this.getFee(new EmptyOperation(op), assetId);
        }
    }
}
