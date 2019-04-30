import { Account } from "./Account";
import { Asset } from "./Asset";
import { AssetAmount } from "./AssetAmount";
import { BlockHeader } from "./BlockHeader";
import { ChainObject } from "./ChainObject";
import { Content } from "./Content";
import { TransferOperation } from "./operation/TransferOperation";

export class TransferComposite {
    public id: ChainObject;
    public operation: TransferOperation;
    public balance: Array<[AssetAmount, AssetAmount]>;
    public fee: AssetAmount;
    public from: Account;
    public asset: Asset;
    public block: BlockHeader;
    public feeAsset: Asset;
    public to?: Account;
    public content?: Content;

    constructor(
        id: ChainObject,
        operation: TransferOperation,
        balance: Array<[AssetAmount, AssetAmount]>,
        fee: AssetAmount,
        from: Account,
        asset: Asset,
        block: BlockHeader,
        feeAsset: Asset,
        to?: Account,
        content?: Content,
    ) {
        this.id = id;
        this.operation = operation;
        this.balance = balance;
        this.fee = fee;
        this.from = from;
        this.asset = asset;
        this.block = block;
        this.feeAsset = feeAsset;
        this.to = to;
        this.content = content;
    }
}
