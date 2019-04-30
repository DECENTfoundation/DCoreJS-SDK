import * as ByteBuffer from "bytebuffer";
import * as _ from "lodash";
import * as Long from "long";
import { Moment } from "moment";
import { Address } from "../../crypto/Address";
import { AssetAmount } from "../../models/AssetAmount";
import { AssetOptions } from "../../models/AssetOptions";
import { Authority } from "../../models/Authority";
import { AuthorityMap } from "../../models/AuthorityMap";
import { ChainObject } from "../../models/ChainObject";
import { CustodyData } from "../../models/CustodyData";
import { ExchangeRate } from "../../models/ExchangeRate";
import { KeyPart } from "../../models/KeyPart";
import { Memo } from "../../models/Memo";
import { MonitoredAssetOpts } from "../../models/MonitoredAssetOpts";
import { AccountCreateOperation } from "../../models/operation/AccountCreateOperation";
import { AccountUpdateOperation } from "../../models/operation/AccountUpdateOperation";
import { AddOrUpdateContentOperation } from "../../models/operation/AddOrUpdateContentOperation";
import { AssetClaimFeesOperation } from "../../models/operation/AssetClaimFeesOperation";
import { AssetCreateOperation } from "../../models/operation/AssetCreateOperation";
import { AssetFundPoolsOperation } from "../../models/operation/AssetFundPoolsOperation";
import { AssetIssueOperation } from "../../models/operation/AssetIssueOperation";
import { AssetReserveOperation } from "../../models/operation/AssetReserveOperation";
import { AssetUpdateAdvancedOperation } from "../../models/operation/AssetUpdateAdvancedOperation";
import { AssetUpdateOperation } from "../../models/operation/AssetUpdateOperation";
import { CustomOperation } from "../../models/operation/CustomOperation";
import { LeaveRatingAndCommentOperation } from "../../models/operation/LeaveRatingAndCommentOperation";
import { PurchaseContentOperation } from "../../models/operation/PurchaseContentOperation";
import { RemoveContentOperation } from "../../models/operation/RemoveContentOperation";
import { SendMessageOperation } from "../../models/operation/SendMessageOperation";
import { TransferOperation } from "../../models/operation/TransferOperation";
import { Options } from "../../models/Options";
import { PubKey } from "../../models/PubKey";
import { Publishing } from "../../models/Publishing";
import { RegionalPrice } from "../../models/RegionalPrice";
import { Transaction } from "../../models/Transaction";
import { VoteId } from "../../models/VoteId";

type Adapter<T> = (buffer: ByteBuffer, obj: T) => void;

export class Serializer {

    private adapters: Map<string, Adapter<any>> = new Map();

    constructor() {
        this.adapters.set(ChainObject.name, this.chainIdAdapter);
        this.adapters.set("string", this.stringAdapter);
        this.adapters.set(Address.name, this.addressAdapter);
        this.adapters.set(Authority.name, this.authorityAdapter);
        this.adapters.set(AuthorityMap.name, this.authorityMapAdapter);
        this.adapters.set(Long.name, this.longAdapter);
        this.adapters.set(AssetAmount.name, this.assetAmountAdapter);
        this.adapters.set(Buffer.name, this.bufferAdapter);
        this.adapters.set(Memo.name, this.memoAdapter);
        this.adapters.set(VoteId.name, this.voteAdapter);
        this.adapters.set("boolean", this.booleanAdapter);
        this.adapters.set(Options.name, this.optionsAdapter);
        this.adapters.set(PubKey.name, this.pubKeyAdapter);
        this.adapters.set(Publishing.name, this.publishingAdapter);
        this.adapters.set(Transaction.name, this.transactionAdapter);
        this.adapters.set(AccountCreateOperation.name, this.accountCreateOperationAdapter);
        this.adapters.set(AccountUpdateOperation.name, this.accountUpdateOperationAdapter);
        this.adapters.set(PurchaseContentOperation.name, this.buyContentOperationAdapter);
        this.adapters.set(TransferOperation.name, this.transferOperationAdapter);
        this.adapters.set(RegionalPrice.name, this.regionalPriceAdapter);
        this.adapters.set(KeyPart.name, this.keyPartAdapter);
        this.adapters.set(CustodyData.name, this.custodyDataAdapter);
        this.adapters.set(AddOrUpdateContentOperation.name, this.addOrUpdateContentOperationAdapter);
        this.adapters.set(RemoveContentOperation.name, this.removeContentOperationAdapter);
        this.adapters.set(SendMessageOperation.name, this.customOperationAdapter);
        this.adapters.set(LeaveRatingAndCommentOperation.name, this.rateAndCommentOperationAdapter);
        this.adapters.set(ExchangeRate.name, this.exchangeRateAdapter);
        this.adapters.set(AssetOptions.name, this.assetOptionsAdapter);
        this.adapters.set(MonitoredAssetOpts.name, this.monitoredAssetOptionsAdapter);
        this.adapters.set(AssetCreateOperation.name, this.assetCreateAdapter);
        this.adapters.set(AssetUpdateOperation.name, this.assetUpdateAdapter);
        this.adapters.set(AssetUpdateAdvancedOperation.name, this.assetUpdateAdvAdapter);
        this.adapters.set(AssetIssueOperation.name, this.assetIssueAdapter);
        this.adapters.set(AssetFundPoolsOperation.name, this.assetFundAdapter);
        this.adapters.set(AssetReserveOperation.name, this.assetReserveAdapter);
        this.adapters.set(AssetClaimFeesOperation.name, this.assetClaimAdapter);
    }

    public serialize(obj: any): Buffer {
        const buffer = new ByteBuffer(1024, true);
        this.append(buffer, obj);
        return Buffer.from(buffer.compact(0, buffer.offset).reset().buffer);
    }

    private appendOptional(buffer: ByteBuffer, obj?: any) {
        if (_.isNil(obj)) {
            buffer.writeByte(0);
        } else {
            buffer.writeByte(1);
            this.append(buffer, obj);
        }
    }

    private append(buffer: ByteBuffer, obj: any) {
        if (_.isArray(obj) && obj.length === 0) {
            buffer.writeByte(0);
        } else if (_.isArray(obj)) {
            buffer.writeVarint64(obj.length);
            obj.forEach((value) => this.append(buffer, value));
        } else {
            const key = _.isObject(obj) ? obj.constructor.name : typeof obj;
            const adapter = this.adapters.get(key);
            if (_.isNil(adapter)) {
                throw TypeError(`no adapter for ${key}`);
            }
            adapter(buffer, obj);
        }
    }

    // @ts-ignore fails on instance of Long, force a string
    private chainIdAdapter = (buffer: ByteBuffer, obj: ChainObject) => buffer.writeVarint64(obj.instance.toString());

    private stringAdapter = (buffer: ByteBuffer, obj: string) => {
        const encoded = ByteBuffer.fromUTF8(obj, true);
        buffer.writeVarint32(encoded.capacity());
        buffer.append(encoded);
    }

    private addressAdapter = (buffer: ByteBuffer, obj: Address) => buffer.append(obj.publicKey);

    private authorityAdapter = (buffer: ByteBuffer, obj: Authority) => {
        buffer.writeUint32(obj.weightThreshold);
        this.append(buffer, obj.accountAuths);
        this.append(buffer, obj.keyAuths);
    }

    private authorityMapAdapter = (buffer: ByteBuffer, obj: AuthorityMap) => {
        this.append(buffer, obj.value);
        buffer.writeUint16(obj.weight);
    }

    private longAdapter = (buffer: ByteBuffer, obj: Long) => {
        // @ts-ignore fails on instance of Long, force a string
        buffer.writeUint64(obj.toString());
    }

    private assetAmountAdapter = (buffer: ByteBuffer, obj: AssetAmount) => {
        this.append(buffer, obj.amount);
        this.append(buffer, obj.assetId);
    }

    private bufferAdapter = (buffer: ByteBuffer, obj: Buffer) => {
        buffer.writeVarint32(obj.length);
        buffer.append(obj);
    }

    private memoAdapter = (buffer: ByteBuffer, obj: Memo) => {
        if (_.isNil(obj.from)) {
            buffer.append(Buffer.alloc(33, 0));
        } else {
            this.append(buffer, obj.from);
        }
        if (_.isNil(obj.to)) {
            buffer.append(Buffer.alloc(33, 0));
        } else {
            this.append(buffer, obj.to);
        }
        this.append(buffer, obj.nonce);
        this.append(buffer, Buffer.from(obj.message, "hex"));
    }

    // tslint:disable-next-line:no-bitwise
    private voteAdapter = (buffer: ByteBuffer, obj: VoteId) => buffer.writeUint32(obj.id << 8 | obj.type);

    private booleanAdapter = (buffer: ByteBuffer, obj: boolean) => buffer.writeByte(obj ? 1 : 0);

    private optionsAdapter = (buffer: ByteBuffer, obj: Options) => {
        this.append(buffer, obj.memoKey);
        this.append(buffer, obj.votingAccount);
        buffer.writeUint16(obj.numMiner);
        this.append(buffer, obj.votes);
        this.append(buffer, obj.extensions);
        this.append(buffer, obj.allowSubscription);
        this.append(buffer, obj.pricePerSubscribe);
        buffer.writeUint32(obj.subscriptionPeriod);
    }

    private pubKeyAdapter = (buffer: ByteBuffer, obj: PubKey) => this.append(buffer, obj.key);

    private publishingAdapter = (buffer: ByteBuffer, obj: Publishing) => {
        this.append(buffer, obj.isPublishingManager);
        this.append(buffer, obj.publishRightsReceived);
        this.append(buffer, obj.publishRightsForwarded);
    }

    private momentAdapter = (buffer: ByteBuffer, obj: Moment) => {
        buffer.writeUint32(obj.utc().unix());
    }

    private transactionAdapter = (buffer: ByteBuffer, obj: Transaction) => {
        buffer.writeUint16(obj.refBlockNum);
        buffer.writeUint32(obj.refBlockPrefix.getLowBitsUnsigned());
        this.momentAdapter(buffer, obj.expiration);
        this.append(buffer, obj.operations);
        this.append(buffer, obj.extensions);
    }

    private accountCreateOperationAdapter = (buffer: ByteBuffer, obj: AccountCreateOperation) => {
        buffer.writeByte(obj.type);
        this.append(buffer, obj.fee);
        this.append(buffer, obj.registrar);
        this.append(buffer, obj.name);
        this.append(buffer, obj.owner);
        this.append(buffer, obj.active);
        this.append(buffer, obj.options);
        this.append(buffer, obj.extensions);
    }

    private accountUpdateOperationAdapter = (buffer: ByteBuffer, obj: AccountUpdateOperation) => {
        buffer.writeByte(obj.type);
        this.append(buffer, obj.fee);
        this.append(buffer, obj.accountId);
        this.appendOptional(buffer, obj.owner);
        this.appendOptional(buffer, obj.active);
        this.appendOptional(buffer, obj.options);
        this.append(buffer, obj.extensions);
    }

    private buyContentOperationAdapter = (buffer: ByteBuffer, obj: PurchaseContentOperation) => {
        buffer.writeByte(obj.type);
        this.append(buffer, obj.fee);
        this.append(buffer, obj.uri);
        this.append(buffer, obj.consumer);
        this.append(buffer, obj.price);
        buffer.writeUint32(obj.regionCode);
        this.append(buffer, obj.publicElGamal);
    }

    private transferOperationAdapter = (buffer: ByteBuffer, obj: TransferOperation) => {
        buffer.writeByte(obj.type);
        this.append(buffer, obj.fee);
        this.append(buffer, obj.from);
        buffer.append(obj.to.fullBytes);
        this.append(buffer, obj.amount);
        this.appendOptional(buffer, obj.memo);
        this.append(buffer, obj.extensions);
    }

    private coAuthorsAdapter = (buffer: ByteBuffer, obj: Array<[ChainObject, number]>) => {
        buffer.writeVarint64(obj.length);
        obj.forEach(([id, weight]) => {
            this.append(buffer, id);
            buffer.writeUint32(weight);
        });
    }

    private regionalPriceAdapter = (buffer: ByteBuffer, obj: RegionalPrice) => {
        buffer.writeUint32(obj.region);
        this.append(buffer, obj.price);
    }

    private keyPartAdapter = (buffer: ByteBuffer, obj: KeyPart) => {
        this.append(buffer, obj.keyC1);
        this.append(buffer, obj.keyD1);
    }

    private custodyDataAdapter = (buffer: ByteBuffer, obj: CustodyData) => {
        buffer.writeUint32(obj.n);
        this.stringAdapter(buffer, obj.seed);
        this.stringAdapter(buffer, obj.pubKey);
    }

    private addOrUpdateContentOperationAdapter = (buffer: ByteBuffer, obj: AddOrUpdateContentOperation) => {
        buffer.writeByte(obj.type);
        this.append(buffer, obj.fee);
        this.append(buffer, obj.size);
        this.append(buffer, obj.author);
        this.coAuthorsAdapter(buffer, obj.coAuthors);
        this.append(buffer, obj.uri);
        buffer.writeUint32(obj.quorum);
        this.append(buffer, obj.price);
        buffer.append(Buffer.from(obj.hash, "hex"));
        this.append(buffer, obj.seeders);
        this.append(buffer, obj.keyParts);
        this.momentAdapter(buffer, obj.expiration);
        this.append(buffer, obj.publishingFee);
        this.append(buffer, obj.synopsis);
        this.appendOptional(buffer, obj.custodyData);
    }

    private removeContentOperationAdapter = (buffer: ByteBuffer, obj: RemoveContentOperation) => {
        buffer.writeByte(obj.type);
        this.append(buffer, obj.fee);
        this.append(buffer, obj.author);
        this.append(buffer, obj.uri);
    }

    private customOperationAdapter = (buffer: ByteBuffer, obj: CustomOperation) => {
        buffer.writeByte(obj.type);
        this.append(buffer, obj.fee);
        this.append(buffer, obj.payer);
        this.append(buffer, obj.requiredAuths);
        buffer.writeUint16(obj.id);
        this.append(buffer, Buffer.from(obj.data, "hex"));
    }

    private rateAndCommentOperationAdapter = (buffer: ByteBuffer, obj: LeaveRatingAndCommentOperation) => {
        buffer.writeByte(obj.type);
        this.append(buffer, obj.fee);
        this.append(buffer, obj.uri);
        this.append(buffer, obj.consumer);
        this.append(buffer, obj.comment);
        buffer.writeUint64(obj.rating);
    }

    private exchangeRateAdapter = (buffer: ByteBuffer, obj: ExchangeRate) => {
        this.append(buffer, obj.base);
        this.append(buffer, obj.quote);
    }

    private assetOptionsAdapter = (buffer: ByteBuffer, obj: AssetOptions) => {
        buffer.writeUint64(obj.maxSupply);
        this.append(buffer, obj.exchangeRate);
        this.append(buffer, obj.exchangeable);
        buffer.writeByte(obj.extensions.length);
        if (obj.isFixedMaxSupply !== undefined) {
            // typedef static_variant<void_t, fixed_max_supply_struct>     asset_options_extensions;
            // fixed_max_supply_struct has index 1 therefore we write '1''
            buffer.writeByte(1);
            // struct fixed_max_supply_struct { bool is_fixed_max_supply ; }
            this.append(buffer, obj.isFixedMaxSupply);
        } else {
            buffer.writeByte(0);
        }
    }

    private monitoredAssetOptionsAdapter = (buffer: ByteBuffer, obj: MonitoredAssetOpts) => {
        this.append(buffer, obj.feeds);
        this.append(buffer, obj.currentFeed.coreExchangeRate);
        this.momentAdapter(buffer, obj.currentFeedPublicationTime);
        buffer.writeUint32(obj.feedLifetimeSec);
        buffer.writeUint8(obj.minimumFeeds);
    }

    private assetCreateAdapter = (buffer: ByteBuffer, obj: AssetCreateOperation) => {
        buffer.writeByte(obj.type);
        this.append(buffer, obj.fee);
        this.append(buffer, obj.issuer);
        this.append(buffer, obj.symbol);
        buffer.writeUint8(obj.precision);
        this.append(buffer, obj.description);
        this.append(buffer, obj.options);
        this.appendOptional(buffer, obj.monitoredOptions);
        this.append(buffer, true);
        this.append(buffer, obj.extensions);
    }

    private assetUpdateAdapter = (buffer: ByteBuffer, obj: AssetUpdateOperation) => {
        buffer.writeByte(obj.type);
        this.append(buffer, obj.fee);
        this.append(buffer, obj.issuer);
        this.append(buffer, obj.assetToUpdate);
        this.append(buffer, obj.newDescription);
        this.appendOptional(buffer, obj.newIssuer);
        buffer.writeUint64(obj.maxSupply);
        this.append(buffer, obj.coreExchangeRate);
        this.append(buffer, obj.exchangeable);
        this.append(buffer, obj.extensions);
    }

    private assetUpdateAdvAdapter = (buffer: ByteBuffer, obj: AssetUpdateAdvancedOperation) => {
        buffer.writeByte(obj.type);
        this.append(buffer, obj.fee);
        this.append(buffer, obj.issuer);
        this.append(buffer, obj.assetToUpdate);
        buffer.writeUint8(obj.precision);
        this.append(buffer, obj.fixedMaxSupply);
        this.append(buffer, obj.extensions);
    }

    private assetIssueAdapter = (buffer: ByteBuffer, obj: AssetIssueOperation) => {
        buffer.writeByte(obj.type);
        this.append(buffer, obj.fee);
        this.append(buffer, obj.issuer);
        this.append(buffer, obj.assetToIssue);
        this.append(buffer, obj.issueToAccount);
        this.appendOptional(buffer, obj.memo);
        this.append(buffer, obj.extensions);
    }

    private assetFundAdapter = (buffer: ByteBuffer, obj: AssetFundPoolsOperation) => {
        buffer.writeByte(obj.type);
        this.append(buffer, obj.fee);
        this.append(buffer, obj.from);
        this.append(buffer, obj.uia);
        this.append(buffer, obj.dct);
        this.append(buffer, obj.extensions);
    }

    private assetReserveAdapter = (buffer: ByteBuffer, obj: AssetReserveOperation) => {
        buffer.writeByte(obj.type);
        this.append(buffer, obj.fee);
        this.append(buffer, obj.payer);
        this.append(buffer, obj.amount);
        this.append(buffer, obj.extensions);
    }

    private assetClaimAdapter = (buffer: ByteBuffer, obj: AssetClaimFeesOperation) => {
        buffer.writeByte(obj.type);
        this.append(buffer, obj.fee);
        this.append(buffer, obj.issuer);
        this.append(buffer, obj.uia);
        this.append(buffer, obj.dct);
        this.append(buffer, obj.extensions);
    }
}
